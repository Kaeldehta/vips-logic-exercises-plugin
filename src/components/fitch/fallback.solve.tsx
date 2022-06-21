import useFitchProofStoreContext from "../../contexts/fitch";

const FitchFallbackSolve = () => {
  const [, set] = useFitchProofStoreContext();

  return (
    <button
      onClick={() => set([{ type: "prem", indentation: 0, formula: "" }])}
      type="button"
    >
      Add
    </button>
  );
};

export default FitchFallbackSolve;
