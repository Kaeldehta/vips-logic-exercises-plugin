import { Component, createContext, JSX, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store"
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
            formula: ""
        }),
        insertAssumption: (index: number, indentation: number) => insertLine(index, {
            type: "ass",
            indentation,
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
        setFormula: (index: number, value: string) => setState(index, produce(state => {
            if (state.type === "abs") {
                throw new Error("Can not set formula on absurdity")
            }
            state.formula = value
        })),
        setFrom: (index: number, fromIndex: number, value: number) => setState(index, produce(state => {
            if (!(state.type === "abs" || state.type === "rule")) {
                throw new Error("Can not set from on non rule line or absurdity")
            }
            state.from[fromIndex] = value
        })),
        setRule: (index: number, value: string) => setState(index, produce(state => {
            if (state.type !== "rule") {
                throw new Error("Can not set rule on non rule line")
            }
            state.rule = value
        }))
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