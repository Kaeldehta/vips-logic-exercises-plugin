import useStoreContext from "../../../context";
import { FormulaType } from "../../../schemas/common";
import { SemanticTreeType } from "../../../schemas/tree";
import Formula from "../../Formula";

const TreeFormula = (props: { value: FormulaType; index: number }) => {
  const [, set] = useStoreContext<SemanticTreeType>();

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
