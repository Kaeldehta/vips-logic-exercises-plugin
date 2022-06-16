import { batch, Show } from "solid-js";
import { produce } from "solid-js/store";
import useSemanticTreeStoreContext from "../../contexts/tree";
import { SemanticTreeType } from "../../schemas/solve";
import IconButton from "../IconButton";
import ArrowDownCircle from "../icons/ArrowDownCircle";
import PlusCircle from "../icons/PlusCircle";

interface InserterProps {
  index: number;
  end: number;
  right: number | undefined;
}

const Inserter = (props: InserterProps) => {
  const [, set] = useSemanticTreeStoreContext();

  const insert = ({
    index,
    line,
  }: {
    index: number;
    line: SemanticTreeType[number];
  }) =>
    batch(() => {
      set(
        produce((state) => {
          state.splice(index, 0, line);
        })
      );
      if (props.right) {
        updateRight(index + 1);
        set(props.index, { right: undefined });
        set(props.index + 1, { right: props.right + 1 });
      } else {
        updateRight(index);
      }
    });

  const updateRight = (index: number, amount = 1) => {
    set(
      (state) => !!state.right && state.right >= index,
      "right" as never,
      (right: number) => right + amount
    );
  };

  const branch = () =>
    batch(() => {
      updateRight(props.index + 1, 2);
      set(
        produce((state) => {
          state.splice(
            props.index + 1,
            0,
            {
              type: "rule",
              formula: "",
              from: [-1],
              rule: "" as never,
            },
            { type: "rule", formula: "", from: [-1], rule: "" as never }
          );
          state[props.index].right = props.index + 2;
        })
      );
    });

  return (
    <div class="group h-16 group w-40 flex justify-center gap-2 items-center">
      <Show when={props.index === props.end}>
        <IconButton
          onClick={[
            insert,
            { index: props.index + 1, line: { type: "abs", from: [-1, -1] } },
          ]}
        >
          {"\u22A5"}
        </IconButton>
        <IconButton onClick={branch}>B</IconButton>
      </Show>
      <IconButton
        onClick={[
          insert,
          { index: props.index + 1, line: { type: "ass", formula: "" } },
        ]}
      >
        <PlusCircle />
      </IconButton>
      <IconButton
        onClick={[
          insert,
          {
            index: props.index + 1,
            line: {
              type: "rule",
              formula: "",
              from: [-1],
              rule: "" as never,
            },
          },
        ]}
      >
        <ArrowDownCircle />
      </IconButton>
    </div>
  );
};

export default Inserter;
