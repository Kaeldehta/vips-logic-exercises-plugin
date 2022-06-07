import { Component, createContext, JSX, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store"
import { SemanticTree, SemanticTreeNode } from "../../src/types";


type SemanticTreeContextType = ReturnType<typeof makeSemanticTreeContext>;

const makeSemanticTreeContext = (initialProof: SemanticTree = []) => {
    const [state, setState] = createStore<SemanticTree>(initialProof);

    const insertLine = (index: number, node: SemanticTreeNode) => setState(produce(state => {

        const leftChildIndex = 2 * index + 1
        const rightChildIndex = 2 * index + 2

        const leftChild = state[leftChildIndex]
        const rightChild = state[rightChildIndex]

        state[2 * leftChildIndex + 1] = leftChild;
        state[2 * leftChildIndex + 2] = rightChild;

        state[leftChildIndex] = node
        delete state[rightChildIndex];

    }))

    return [state, {
        insertAssumption: (index: number) => insertLine(index, {
            type: "ass",
            formula: ""
        }),
        insertRuleLine: (index: number) => insertLine(index, {
            type: "rule",
            from: [],
            formula: "",
            rule: null
        }),
        insertAbsurdity: (index: number) => insertLine(index, {
            type: "abs",
            from: [-1, -1],
        }),
        removeLine: (index: number) => setState(produce(state => {
            state.splice(index, 1)
            // TODO Better Remove
        })),
        setFormula: (index: number, value: string) => setState(index, produce(state => {
            if (!state) {
                throw new Error("This node does not exist")
            }
            if (state.type === "abs") {
                throw new Error("Can not set formula on absurdity")
            }
            state.formula = value
        })),
        setFrom: (index: number, fromIndex: number, value: number) => setState(index, produce(state => {
            if (!state) {
                throw new Error("This node does not exist")
            }
            if (!(state.type === "abs" || state.type === "rule")) {
                throw new Error("Can not set from on non rule line or absurdity")
            }
            state.from[fromIndex] = value
        })),
        setRule: (index: number, value: string) => setState(index, produce(state => {
            if (!state) {
                throw new Error("This node does not exist")
            }
            if (state.type !== "rule") {
                throw new Error("Can not set rule on non rule line")
            }
            state.rule = value
        })),
        start: () => setState(0, {
            type: "ass",
            formula: "",
        })
    }] as const;
}

const SemanticTreeContext = createContext<SemanticTreeContextType>(makeSemanticTreeContext());

interface SemanticTreeProviderProps {
    children: JSX.Element
    proof?: SemanticTree
}

export const SemanticTreeProvider: Component<SemanticTreeProviderProps> = (props) => {

    return <SemanticTreeContext.Provider value={makeSemanticTreeContext(props.proof)}>
        {props.children}
    </SemanticTreeContext.Provider>
}

export const useSemanticTree = () => useContext(SemanticTreeContext);