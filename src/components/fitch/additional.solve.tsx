import useFitchProofStoreContext from "../../contexts/fitch";
import { fitchProofSchema } from "../../schemas/solve";
import Validator from "../Validator";

const FitchAdditionalSolve = () => {
  const [store] = useFitchProofStoreContext();

  return <Validator values={store} schema={fitchProofSchema} />;
};

export default FitchAdditionalSolve;
