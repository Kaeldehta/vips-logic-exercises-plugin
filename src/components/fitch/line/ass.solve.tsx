import { ParentProps } from "solid-js";
import useFitchProofStoreContext from "../../../contexts/fitch";
import { FitchAssumptionType } from "../../../schemas/solve";
import Formula from "../../Formula";

const FitchLineAssSolve = (
  props: ParentProps<{
    line: FitchAssumptionType;
    index: number;
  }>
) => {
  const [, set] = useFitchProofStoreContext();

  return (
    <>
      <Formula
        name={`response[${props.index}][formula]`}
        value={props.line.formula}
        setValue={(formula) => set(props.index, { formula })}
      />
      {props.children}
      <span>Ass.</span>
    </>
  );
};

export default FitchLineAssSolve;
