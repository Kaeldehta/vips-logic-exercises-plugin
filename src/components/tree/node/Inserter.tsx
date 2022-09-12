import { batch, createUniqueId, Show } from "solid-js";
import { produce } from "solid-js/store";
import useStoreContext from "../../../context";
import { SemanticTreeType } from "../../../schemas/tree";
import IconButton from "../../IconButton";
import ArrowDownCircle from "../../icons/ArrowDownCircle";
import PlusCircle from "../../icons/PlusCircle";

interface InserterProps {
  index: number;
  end: number;
  right: number | undefined;
}

const Inserter = (props: InserterProps) => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const insert = (line: SemanticTreeType["nodes"][number]) =>
    batch(() => {
      const index = props.index;

      const right = props.right;

      set(
        produce((state) => {
          state.nodes.splice(index + 1, 0, line);
        })
      );

      updateRightAndFrom(index + 1);
      if (right) {
        set("nodes", index, { right: undefined });
        set("nodes", index + 1, { right: right + 1 });
      }
    });

  const insertRule = () =>
    insert({
      type: "rule",
      formula: [],
      from: [-1],
      rule: "" as never,
      id: createUniqueId(),
    });

  const insertAss = () =>
    insert({ type: "ass", formula: [], id: createUniqueId() });

  const insertAbs = () =>
    insert({ type: "abs", from: [-1, -1], id: createUniqueId() });

  const updateRightAndFrom = (index: number, amount = 1) => {
    set(
      "nodes",
      (state) => !!state.right && state.right >= index,
      "right" as never,
      (right: number) => (right + amount) as never
    );
    set(
      "nodes",
      (line) => line.type === "rule" || line.type == "abs",
      "from" as never,
      (from: number) => from >= index,
      (from: number) => (from + amount) as never
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
              id: createUniqueId(),
            },
            {
              type: "rule",
              formula: [],
              from: [-1],
              rule: "" as never,
              id: createUniqueId(),
            }
          );
          state.nodes[props.index].right = props.index + 2;
        })
      );
    });

  return (
    <div class="group h-16 group w-40 flex justify-center gap-2 items-center">
      <Show when={props.index === props.end}>
        <IconButton title="Specify contradiction" onClick={insertAbs}>
          {"\u22A5"}
        </IconButton>
        <IconButton title="Branch tree" onClick={branch}>
          B
        </IconButton>
      </Show>
      <IconButton title="Insert assumption" onClick={insertAss}>
        <PlusCircle />
      </IconButton>
      <IconButton title="Apply rule" onClick={insertRule}>
        <ArrowDownCircle />
      </IconButton>
    </div>
  );
};

export default Inserter;
