import { batch, Show } from "solid-js";
import { produce } from "solid-js/store";
import { TreeLineProps } from ".";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import IconButton from "../../IconButton";
import MinusCircle from "../../icons/MinusCircle";

const TreeLineSolveAdditional = (props: TreeLineProps) => {
  const [, set] = useSemanticTreeStoreContext();

  const updateRight = (index: number, amount = 1) => {
    set(
      (state) => !!state.right && state.right > index,
      "right" as never,
      (right: number) => right - amount
    );
  };

  const removeHandler = () =>
    batch(() => {
      // const rightChild = store.find((a) => a.right == props.index);
      // const leftChild = !rightChild && !!store[props.index - 1]?.right;

      if (!props.line.right) {
        updateRight(props.index);
        set(
          produce((state) => {
            state.splice(props.index, 1);
          })
        );
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
