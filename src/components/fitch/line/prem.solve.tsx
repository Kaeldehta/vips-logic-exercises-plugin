import useFitchProofStoreContext from "../../../contexts/fitch";
import { FitchPremiseType } from "../../../schemas/solve";
import Formula from "../../Formula";

const FitchLinePremSolve = (props: {
  line: FitchPremiseType;
  index: number;
}) => {
  const [, set] = useFitchProofStoreContext();

  return (
    <>
      <Formula
        name={`response[${props.index}][formula]`}
        value={props.line.formula}
        setValue={(formula) => set(props.index, { formula })}
      />
      <span>Prem.</span>
    </>
  );
};

export default FitchLinePremSolve;
