import { TreeCounterModelEntryProps } from ".";
import useStoreContext from "../../../../context";
import {
  PropositionalModelType,
  SemanticTreeType,
} from "../../../../schemas/tree";
import Formula from "../../../Formula";

interface PropositionalProps extends TreeCounterModelEntryProps {
  entry: PropositionalModelType;
}

const TreeCounterModelPropositionalSolve = (props: PropositionalProps) => {
  const [, set] = useStoreContext<SemanticTreeType>();

  return (
    <>
      <Formula
        max={1}
        match={/[pqr]/}
        value={props.entry.constant}
        setValue={(v) =>
          set("countermodel", props.index, "constant" as never, v as never)
        }
        name={`response[countermodel][${props.index}][constant]`}
      />
      <span>:</span>
      <select
        class="w-28"
        onChange={(e) => {
          const value = e.currentTarget.value as "true" | "false";
          set("countermodel", props.index, { value });
        }}
        value={props.entry.value.toString()}
        name={`response[countermodel][${props.index}][value]`}
      >
        <option value={"true"}>True</option>
        <option value={"false"}>False</option>
      </select>
    </>
  );
};

export default TreeCounterModelPropositionalSolve;
