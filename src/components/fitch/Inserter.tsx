import { FitchProofType } from "../../schemas/solve";
import Border from "./Border";
import IconButton from "../IconButton";
import useFitchProofStoreContext from "../../contexts/fitch";
import { batch, createMemo, Index, Show } from "solid-js";
import { produce } from "solid-js/store";
import ArrowRightCircle from "../icons/ArrowRightCircle";
import ArrowDownCircle from "../icons/ArrowDownCircle";
import PlusCircle from "../icons/PlusCircle";

interface InserterProps {
  index: number;
  indentation: FitchProofType[number]["indentation"];
  type: FitchProofType[number]["type"];
}

const Inserter = (props: InserterProps) => {
  const [store, set] = useFitchProofStoreContext();

  const insert = ({
    index,
    line,
  }: {
    index: number;
    line: FitchProofType[number];
  }) =>
    batch(() => {
      set(
        produce((state) => {
          state.splice(index, 0, line);
        })
      );
      set(
        (line) => line.type === "rule" || line.type == "abs",
        "from" as never,
        (from: number) => from >= index,
        (from: number) => from + 1
      );
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
                  onClick={[
                    insert,
                    {
                      index: props.index + 1,
                      line: {
                        type: "ass",
                        indentation: newIndentation + 1,
                        formula: "",
                      },
                    },
                  ]}
                >
                  <ArrowRightCircle />
                </IconButton>
                <IconButton
                  title="Add Rule Line"
                  onClick={[
                    insert,
                    {
                      index: props.index + 1,
                      line: {
                        type: "rule",
                        indentation: newIndentation,
                        formula: "",
                        rule: "" as never,
                        from: [],
                      },
                    },
                  ]}
                >
                  <ArrowDownCircle />
                </IconButton>
                <Show when={newIndentation > 0}>
                  <IconButton
                    title="Add Absurdity"
                    onClick={[
                      insert,
                      {
                        index: props.index + 1,
                        line: {
                          type: "abs",
                          indentation: newIndentation,
                          from: [-1, -1],
                        },
                      },
                    ]}
                  >
                    {"\u22A5"}
                  </IconButton>
                </Show>
              </Show>
              <Show when={props.type === "prem"}>
                <IconButton
                  title="Add Premise"
                  onClick={[
                    insert,
                    {
                      index: props.index + 1,
                      line: {
                        type: "prem",
                        indentation: 0,
                        formula: "",
                      },
                    },
                  ]}
                >
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
