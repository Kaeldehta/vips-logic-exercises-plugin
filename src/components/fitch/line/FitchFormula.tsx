import useStoreContext from "../../../context";
import { FormulaType } from "../../../schemas/common";
import { FitchProofType } from "../../../schemas/fitch";
import Formula from "../../Formula";

const FitchFormula = (props: { value: FormulaType; index: number }) => {
  const [, set] = useStoreContext<FitchProofType>();

  return (
    <Formula
      name={`response[${props.index}][formula]`}
      value={props.value}
      setValue={(v) => set(props.index, "formula" as never, v as never)}
    />
  );
};

export default FitchFormula;
