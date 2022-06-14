import { batch, Index, Show } from "solid-js"
import { produce } from "solid-js/store"
import useSemanticTreeStoreContext from "../../contexts/tree"
import { SemanticTreeType } from "../../schemas/solve"
import Formula from "../Formula"
import IconButton from "../IconButton"
import MinusCircle from "../icons/MinusCircle"
import Inserter from "./Inserter"
import SemanticTreeFromSelect from "./SemanticTreeFromSelect"
import SemanticTreeRuleSelect from "./SemanticTreeRuleSelect"

interface SemanticTreeNodeProps {
    index: number,
    line: SemanticTreeType[number]
    end: number
}


const SemanticTreeLine = (props: SemanticTreeNodeProps) => {

    const [store, set] = useSemanticTreeStoreContext();

    const updateRight = (index: number, amount: number = 1) => {
        set(state => !!state.right && state.right > index, "right" as any, right => right - amount)
    }

    const removeHandler = () => batch(() => {

        const rightChild = store.find((a) => a.right == props.index);
        const leftChild = !rightChild && !!store[props.index - 1]?.right

        if (!props.line.right) {
            updateRight(props.index)
            set(produce(state => {
                state.splice(props.index, 1);
            }))
        }

    })

    return <>
        <div class="group hover:bg-gray-100 rounded-md p-1 flex flex-col justify-start items-center gap-2">
            <div class="h-16 w-[30.5rem] group flex justify-start gap-2 items-center">
                <span class="w-10">{props.index + 1}</span>
                {props.line.type !== "abs" && <Formula value={props.line.formula} setValue={(v) => set(props.index, "formula" as any, v)} />}
                {props.line.type === "ass" && "Ass"}
                {props.line.type === "rule" && <>
                    <SemanticTreeRuleSelect rule={props.line.rule} index={props.index} />
                    <SemanticTreeFromSelect value={props.line.from[0]} setValue={(from) => set(props.index, "from" as any, 0, from)} />
                </>}
                {props.line.type === "abs" && <>
                    <span class="w-52">{"\u22A5"}</span>
                    <Index each={props.line.from}>{(from, index) => <SemanticTreeFromSelect value={from()} setValue={from => set(props.index, "from" as any, index, from)} />}</Index>
                </>}
                <span class="w-12"><IconButton onClick={removeHandler} class="text-red-600"><MinusCircle /></IconButton></span>
            </div>
            <Show when={props.line.type !== "abs"}><Inserter index={props.index} end={props.end} right={props.line.right} /></Show>
        </div>
        <Show when={props.line.type !== "abs"}>
            <Show when={props.line.right} fallback={<Show when={props.index !== props.end}>
                <SemanticTreeLine index={props.index + 1} line={store[props.index + 1]} end={props.end} />
            </Show>}>
                <div class="flex gap-8">
                    <div class="flex flex-col gap-1 justify-start items-center">
                        <SemanticTreeLine index={props.index + 1} line={store[props.index + 1]} end={props.line.right! - 1} />
                    </div>
                    <div class="flex flex-col gap-1 justify-start items-center">
                        <SemanticTreeLine index={props.line.right!} line={store[props.line.right!]} end={props.end} />
                    </div>
                </div>
            </Show>
        </Show>
    </>
}

export default SemanticTreeLine;