import { batch, Show } from "solid-js";
import { produce } from "solid-js/store";
import useSemanticTreeStoreContext from "../../contexts/tree";
import { SemanticTreeType } from "../../schemas/solve";
import IconButton from "../IconButton";
import ArrowDownCircle from "../icons/ArrowDownCircle";
import PlusCircle from "../icons/PlusCircle";

interface InserterProps {
    index: number
    end: number
    right: number | undefined
}

const Inserter = (props: InserterProps) => {

    const [_, set] = useSemanticTreeStoreContext()

    const insert = (index: number, line: SemanticTreeType[number]) => batch(() => {
        set(produce(state => {
            state.splice(index, 0, line)
        }))
        if (props.right) {
            updateRight(index + 1);
            set(props.index, { right: undefined })
            set(props.index + 1, { right: props.right + 1 })
        }
        else {
            updateRight(index);
        }
    })

    const updateRight = (index: number, amount: number = 1) => {
        set(state => (state.right ?? 0) >= index, "right" as any, (right) => right + amount)
    }

    return <div class="group h-16 group w-40 flex justify-center gap-2 items-center">
        <Show when={props.index === props.end}>
            <IconButton onClick={() => insert(props.index + 1, { type: "abs", from: [-1, -1] })}>{"\u22A5"}</IconButton>
            <IconButton onClick={() => batch(() => {
                updateRight(props.index + 1, 2)
                set(produce(state => {
                    state.splice(props.index + 1, 0, { type: "rule", formula: "", from: [-1], rule: "" as any }, { type: "rule", formula: "", from: [-1], rule: "" as any });
                    state[props.index].right = props.index + 2;
                }))
            })}>B</IconButton>
        </Show>
        <IconButton onClick={() => insert(props.index + 1, { type: "ass", formula: "" })} ><PlusCircle /></IconButton>
        <IconButton onClick={() => insert(props.index + 1, { type: "rule", formula: "", from: [-1], rule: "" as any })}><ArrowDownCircle /></IconButton>
    </div>
}

export default Inserter;
