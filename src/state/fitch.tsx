import { Component, createContext, JSX, useContext } from "solid-js";
import { createStore, produce, DeepReadonly } from "solid-js/store"
import { FitchProof, FitchProofLine } from "../types";


type FitchProofContextType = ReturnType<typeof makeFitchProofContext>;

const makeFitchProofContext = (initialProof: FitchProof = []) => {
    const [state, setState] = createStore<FitchProof>(initialProof);

    const insertLine = (index: number, line: FitchProofLine) => setState(produce(state => {
        state.splice(index, 0, line)
    }))

    return [state, {
        insertPremise: (index: number) => insertLine(index, {
            type: "prem",
            indentation: 0,
            from: [],
            formula: ""
        }),
        insertAssumption: (index: number, indentation: number) => insertLine(index, {
            type: "ass",
            indentation,
            from: [],
            formula: ""
        }),
        insertRuleLine: (index: number, indentation: number) => insertLine(index, {
            type: "rule",
            indentation,
            from: [],
            formula: "",
            rule: null
        }),
        insertAbsurdity: (index: number, indentation: number) => insertLine(index, {
            type: "abs",
            indentation,
            from: [-1, -1],
        }),
        removeLine: (index: number) => setState(produce(state => {
            state.splice(index, 1)
        })),
        setFormula: (index: number, value: string) => setState(index, "formula", value),
        setFrom: (index: number, fromIndex: number, value: number) => setState(index, "from", fromIndex, value)
    }] as const;
}

const FitchProofContext = createContext<FitchProofContextType>(makeFitchProofContext());

interface FitchProofProviderProps {
    children: JSX.Element
    proof?: FitchProof
}

export const FitchProofProvider: Component<FitchProofProviderProps> = (props) => {

    return <FitchProofContext.Provider value={makeFitchProofContext(props.proof)}>
        {props.children}
    </FitchProofContext.Provider>
}

export const useFitchProof = () => useContext(FitchProofContext);