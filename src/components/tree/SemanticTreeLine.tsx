import { batch, Show } from "solid-js"
import { produce } from "solid-js/store"
import useSemanticTreeStoreContext from "../../contexts/tree"
import { SemanticTreeType } from "../../schemas/solve"
import Formula from "../Formula"
import IconButton from "../IconButton"
import MinusCircle from "../icons/MinusCircle"
import Inserter from "./Inserter"

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
        <div class="group h-16 group flex justify-start gap-2 items-center">
            <span>{props.index + 1}</span>
            {props.line.type !== "abs" ? <Formula value={props.line.formula} setValue={(v) => set(props.index, "formula" as any, v)} /> : "abs"}
            <span class="w-20">{props.line.type === "ass" ? "Ass" : ""}</span>
            {/* <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions} /> */}

            {/* <From solutionSelector={state => state.solution.present} id={id} fromRender={FromSelect}/> */}
            {/* <div className="ml-auto">
                <RemoveButton id={id} />
            </div> */}
            <span class="w-12"><IconButton onClick={removeHandler}><MinusCircle /></IconButton></span>

        </div>
        <Show when={props.line.type !== "abs"}>
            <Inserter index={props.index} end={props.end} right={props.line.right} />
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