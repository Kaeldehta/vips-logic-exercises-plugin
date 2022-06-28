import { produce } from "solid-js/store";
import { TreeCounterModelEntryProps } from ".";
import useSemanticTreeStoreContext from "../../../../contexts/tree";
import IconButton from "../../../IconButton";
import MinusCircle from "../../../icons/MinusCircle";

const TreeCounterModelEntryAdditionalSolve = (
  props: TreeCounterModelEntryProps
) => {
  const [, set] = useSemanticTreeStoreContext();

  const remove = () =>
    set(
      "countermodel",
      produce((state) => {
        state?.splice(props.index, 1);
      })
    );

  return (
    <>
      <input
        type="hidden"
        name={`response[countermodel][${props.index}][type]`}
        value={props.entry.type}
      />
      <IconButton show onClick={remove}>
        <MinusCircle />
      </IconButton>
    </>
  );
};

export default TreeCounterModelEntryAdditionalSolve;
