import { batch, Show } from "solid-js";
import { produce } from "solid-js/store";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import IconButton from "../../IconButton";
import MinusCircle from "../../icons/MinusCircle";
import { TreeNodeProps } from "../node";

const TreeLineSolveAdditional = (props: TreeNodeProps) => {
  const [tree, set] = useSemanticTreeStoreContext();

  const removeHandler = () =>
    batch(() => {
      const parentWhereIsRight = tree.findIndex(
        ({ right }) => right === props.index
      );

      const parentIndex =
        parentWhereIsRight === -1 ? props.index - 1 : parentWhereIsRight;

      const parentsRight = tree[parentIndex]?.right;

      const offset =
        !props.line.right || (parentIndex > -1 && !parentsRight)
          ? 1
          : props.end - props.index + 1;

      set(
        (state) => !!state.right && state.right > props.index,
        "right" as never,
        (right: number) => right - offset
      );

      set(
        (line) => line.type === "rule" || line.type == "abs",
        "from" as never,
        (from: number) => from >= props.index,
        (from: number) => from - offset
      );

      set(
        produce((state) => {
          state.splice(props.index, offset);
        })
      );

      if (parentIndex > -1) {
        if (offset > 1 || props.end === props.index) {
          set(parentIndex, "right", undefined);
        } else if (props.line.right && !parentsRight) {
          set(parentIndex, "right", props.line.right - 1);
        }
      }
    });

  return (
    <>
      <input
        type="hidden"
        value={props.line.type}
        name={`response[${props.index}][type]`}
      />
      <Show when={props.line.right}>
        <input
          type="hidden"
          value={props.line.right}
          name={`response[${props.index}][right]`}
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