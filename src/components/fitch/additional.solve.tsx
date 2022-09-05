import useStoreContext from "../../context";
import { FitchProofType } from "../../schemas/fitch";
import fitchProofSchema from "../../schemas/fitch";
import Validator from "../Validator";

const FitchAdditionalSolve = () => {
  const [store] = useStoreContext<FitchProofType>();

  return <Validator values={store} schema={fitchProofSchema} />;
};

export default FitchAdditionalSolve;
