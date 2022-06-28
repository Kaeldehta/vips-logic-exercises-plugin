import { batch, Show } from "solid-js";
import { produce } from "solid-js/store";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import { SemanticTreeType } from "../../../schemas/solve";
import IconButton from "../../IconButton";
import ArrowDownCircle from "../../icons/ArrowDownCircle";
import PlusCircle from "../../icons/PlusCircle";

interface InserterProps {
  index: number;
  end: number;
  right: number | undefined;
}

const Inserter = (props: InserterProps) => {
  const [, set] = useSemanticTreeStoreContext();

  const insert = (line: SemanticTreeType["nodes"][number]) =>
    batch(() => {
      const index = props.index + 1;
      set(
        produce((state) => {
          state.nodes.splice(index, 0, line);
        })
      );
      updateRightAndFrom(index);
      if (props.right) {
        set("nodes", props.index, { right: undefined });
        set("nodes", props.index + 1, { right: props.right + 1 });
      }
    });

  const insertRule = () =>
    insert({
      type: "rule",
      formula: [],
      from: [-1],
      rule: "" as never,
    });

  const insertAss = () => insert({ type: "ass", formula: [] });

  const insertAbs = () => insert({ type: "abs", from: [-1, -1] });

  const updateRightAndFrom = (index: number, amount = 1) => {
    set(
      "nodes",
      (state) => !!state.right && state.right >= index,
      "right" as never,
      (right: number) => right + amount
    );
    set(
      "nodes",
      (line) => line.type === "rule" || line.type == "abs",
      "from" as never,
      (from: number) => from >= index,
      (from: number) => from + amount
    );
  };

  const branch = () =>
    batch(() => {
      updateRightAndFrom(props.index + 1, 2);
      set(
        produce((state) => {
          state.nodes.splice(
            props.index + 1,
            0,
            {
              type: "rule",
              formula: [],
              from: [-1],
              rule: "" as never,
            },
            { type: "rule", formula: [], from: [-1], rule: "" as never }
          );
          state.nodes[props.index].right = props.index + 2;
        })
      );
    });

  return (
    <div class="group h-16 group w-40 flex justify-center gap-2 items-center">
      <Show when={props.index === props.end}>
        <IconButton onClick={insertAbs}>{"\u22A5"}</IconButton>
        <IconButton onClick={branch}>B</IconButton>
      </Show>
      <IconButton onClick={insertAss}>
        <PlusCircle />
      </IconButton>
      <IconButton onClick={insertRule}>
        <ArrowDownCircle />
      </IconButton>
    </div>
  );
};

export default Inserter;
