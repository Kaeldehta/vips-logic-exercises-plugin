import { createContext, useContext } from "solid-js";
import { FitchProofType } from "../schemas/solve";
import storeFactory from "../storeFactory";
import { fitchProofSchema } from "../schemas/solve";

const FitchProofContext = createContext(
  storeFactory<FitchProofType>(fitchProofSchema.parse(RESPONSE))
);

const useFitchProofStoreContext = () => useContext(FitchProofContext);

export default useFitchProofStoreContext;
