import { batch, Show } from "solid-js";
import { produce } from "solid-js/store";
import useStoreContext from "../../../context";
import { SemanticTreeType } from "../../../schemas/tree";
import IconButton from "../../IconButton";
import MinusCircle from "../../icons/MinusCircle";
import { TreeNodeProps } from "../node";

const TreeLineSolveAdditional = (props: TreeNodeProps) => {
  const [tree, set] = useStoreContext<SemanticTreeType>();

  const removeHandler = () =>
    batch(() => {
      const index = props.index;

      const right = props.line.right;

      const end = props.end;

      const parentWhereIsRight = tree.nodes.findIndex(
        ({ right }) => right === index
      );

      const parentIndex =
        parentWhereIsRight === -1 ? index - 1 : parentWhereIsRight;

      const parentsRight = tree.nodes[parentIndex]?.right;

      const offset =
        !right || (parentIndex > -1 && !parentsRight) ? 1 : end - index + 1;

      if (parentIndex > -1) {
        if (offset > 1 || end === index) {
          set("nodes", parentIndex, "right", undefined);
        } else if (right && !parentsRight) {
          set("nodes", parentIndex, "right", right);
        }
      }

      set(
        "nodes",
        (state) => !!state.right && state.right > index,
        "right",
        (right) => (right ?? 0) - offset
      );

      set(
        "nodes",
        (line) => line.type === "rule" || line.type == "abs",
        "from" as never,
        (from: number) => from >= index,
        (from) => (from - offset) as never
      );

      set(
        produce((state) => {
          state.nodes.splice(index, offset);
        })
      );
    });

  return (
    <>
      <input
        type="hidden"
        value={props.line.type}
        name={`response[nodes][${props.index}][type]`}
      />
      <Show when={props.line.right}>
        <input
          type="hidden"
          value={props.line.right}
          name={`response[nodes][${props.index}][right]`}
        />
      </Show>
      <span class="w-12 ml-auto">
        <IconButton onClick={removeHandler} class="text-red-600">
          <MinusCircle />
        </IconButton>
      </span>
    </>
  );
};

export default TreeLineSolveAdditional;
