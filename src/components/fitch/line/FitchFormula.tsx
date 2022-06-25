import useFitchProofStoreContext from "../../../contexts/fitch";
import { FormulaType } from "../../../schemas/common";
import Formula from "../../Formula";

const FitchFormula = (props: { value: FormulaType; index: number }) => {
  const [, set] = useFitchProofStoreContext();

  return (
    <Formula
      name={`response[${props.index}][formula]`}
      value={props.value}
      setValue={(v) => set(props.index, "formula" as never, v as never)}
    />
  );
};

export default FitchFormula;
