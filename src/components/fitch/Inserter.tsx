import { FitchProofType } from "../../schemas/fitch";
import Border from "./Border";
import IconButton from "../IconButton";
import { batch, createMemo, createUniqueId, Index, Show } from "solid-js";
import { produce } from "solid-js/store";
import ArrowRightCircle from "../icons/ArrowRightCircle";
import ArrowDownCircle from "../icons/ArrowDownCircle";
import PlusCircle from "../icons/PlusCircle";
import useStoreContext from "../../context";

interface InserterProps {
  index: number;
  indentation: FitchProofType[number]["indentation"];
  type: FitchProofType[number]["type"];
}

const Inserter = (props: InserterProps) => {
  const [store, set] = useStoreContext<FitchProofType>();

  const insert = (line: FitchProofType[number]) =>
    batch(() => {
      const index = props.index + 1;
      set(
        produce((state) => {
          state.splice(index, 0, line);
        })
      );
      set(
        (line) => line.type === "rule",
        "from" as never,
        (from: number) => from >= index,
        (from: number) => (from + 1) as never
      );
    });

  const insertPrem = () =>
    insert({
      id: createUniqueId(),
      type: "prem",
      indentation: 0,
      formula: [],
    });

  const insertRule = (indentation: number) =>
    insert({
      id: createUniqueId(),
      type: "rule",
      indentation,
      formula: [],
      rule: "" as never,
      from: [],
    });

  const insertAss = (indentation: number) =>
    insert({
      id: createUniqueId(),
      type: "ass",
      indentation,
      formula: [],
    });

  const nextType = createMemo(() => store[props.index + 1]?.type);

  const nextIndentation = createMemo(() => store[props.index + 1]?.indentation);

  const indentationDelta = () =>
    nextType()
      ? nextType() === "ass"
        ? nextIndentation() > props.indentation
          ? 0
          : -props.indentation
        : nextIndentation() - props.indentation
      : -props.indentation;

  return (
    <Index each={Array(-Math.min(indentationDelta(), 0) + 1).fill(0)}>
      {(_, indentationOffset) => {
        const newIndentation = props.indentation - indentationOffset;

        return (
          <div class="h-16 min-w-fit flex justify-start gap-2 items-center">
            <div class="w-12"></div>
            <Index each={Array(newIndentation + 1).fill(0)}>
              {() => <Border />}
            </Index>
            <div class="w-52 p-1 flex justify-center">
              <Show when={props.type !== "prem" || nextType() !== "prem"}>
                <IconButton
                  title="Add Assumption"
                  onClick={[insertAss, newIndentation + 1]}
                >
                  <ArrowRightCircle />
                </IconButton>
                <IconButton
                  title="Add Rule Line"
                  onClick={[insertRule, newIndentation]}
                >
                  <ArrowDownCircle />
                </IconButton>
              </Show>
              <Show when={props.type === "prem"}>
                <IconButton title="Add Premise" onClick={insertPrem}>
                  <PlusCircle />
                </IconButton>
              </Show>
            </div>
          </div>
        );
      }}
    </Index>
  );
};

export default Inserter;
