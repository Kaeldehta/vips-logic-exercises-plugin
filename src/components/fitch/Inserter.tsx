import { FitchProofType } from "../../schemas/solve";
import Border from "./Border";
import IconButton from "../IconButton";
import useFitchProofStoreContext from "../../contexts/fitch";
import { Index, Show } from "solid-js";
import { produce } from "solid-js/store";
import ArrowRightCircle from "../icons/ArrowRightCircle";
import ArrowDownCircle from "../icons/ArrowDownCircle";
import PlusCircle from "../icons/PlusCircle";

interface InserterProps {
  index: number
  indentation: FitchProofType[number]["indentation"]
  type: FitchProofType[number]["type"]
}

const Inserter = (props: InserterProps) => {

  const [store, set] = useFitchProofStoreContext();

  const insert = (index: number, line: FitchProofType[number]) => set(produce(state => {
    state.splice(index, 0, line);
  }))

  const nextType = () => store[props.index + 1]?.type;

  const nextIndentation = () => store[props.index + 1]?.indentation

  const indentationDelta = () => nextType() ? (nextType() === "ass" ? (nextIndentation() > props.indentation ? 0 : -props.indentation) : nextIndentation() - props.indentation) : -props.indentation;

  return <Index each={Array(-Math.min(indentationDelta(), 0) + 1).fill(0)}>
    {(_, indentationOffset) => {
      const newIndentation = props.indentation - indentationOffset;

      return <div class="h-16 group min-w-fit flex justify-start gap-2 items-center">
        <div class="w-12"></div>
        <Index each={Array(newIndentation + 1).fill(0)}>
          {() => <Border />}
        </Index>
        <div class="w-52 border-2 p-1 border-white border-solid flex justify-evenly">
          <Show when={props.type !== "prem" || nextType() !== "prem"}>
            <IconButton title="Add Assumption" onClick={() => insert(props.index + 1, { type: "ass", indentation: newIndentation + 1, formula: "" })}><ArrowRightCircle /></IconButton>
            <IconButton title="Add Rule Line" onClick={() => insert(props.index + 1, { type: "rule", indentation: newIndentation, formula: "", rule: "" as any, from: [] })}><ArrowDownCircle /></IconButton>
            <Show when={newIndentation > 0}>
              <IconButton title="Add Absurdity" onClick={() => insert(props.index + 1, { type: "abs", indentation: newIndentation, from0: -1, from1: -1 })}>{"\u22A5"}</IconButton>
            </Show>
          </Show>
          <Show when={props.type === "prem"}>
            <IconButton title="Add Premise" onClick={() => insert(props.index + 1, { type: "prem", indentation: 0, formula: "" })}><PlusCircle /></IconButton>
          </Show>
        </div>
      </div>
    }}
  </Index>
}

export default Inserter;