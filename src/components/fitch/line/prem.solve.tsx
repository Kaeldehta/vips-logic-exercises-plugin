import { ParentProps } from "solid-js";
import useFitchProofStoreContext from "../../../contexts/fitch";
import { FitchPremiseType } from "../../../schemas/solve";
import Formula from "../../Formula";

const FitchLinePremSolve = (
  props: ParentProps<{
    line: FitchPremiseType;
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
      <span>Prem.</span>
    </>
  );
};

export default FitchLinePremSolve;
