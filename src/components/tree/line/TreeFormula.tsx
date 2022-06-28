import useSemanticTreeStoreContext from "../../../contexts/tree";
import { FormulaType } from "../../../schemas/common";
import Formula from "../../Formula";

const TreeFormula = (props: { value: FormulaType; index: number }) => {
  const [, set] = useSemanticTreeStoreContext();

  return (
    <Formula
      name={`response[nodes][${props.index}][formula]`}
      value={props.value}
      setValue={(v) =>
        set("nodes", props.index, "formula" as never, v as never)
      }
    />
  );
};

export default TreeFormula;
