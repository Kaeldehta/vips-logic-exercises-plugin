import useStoreContext from "../../context";
import { FitchProofType } from "../../schemas/fitch";

const FitchFallbackSolve = () => {
  const [, set] = useStoreContext<FitchProofType>();

  return (
    <button
      onClick={() => set([{ type: "prem", indentation: 0, formula: [] }])}
      type="button"
    >
      Add
    </button>
  );
};

export default FitchFallbackSolve;
