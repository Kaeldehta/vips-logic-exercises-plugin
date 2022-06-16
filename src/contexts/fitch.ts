import { createContext, useContext } from "solid-js";
import { FitchProofType } from "../schemas/solve";
import storeFactory from "../storeFactory";

const FitchProofContext = createContext(
  storeFactory<FitchProofType>((RESPONSE as FitchProofType | undefined) ?? [])
);

const useFitchProofStoreContext = () => useContext(FitchProofContext);

export default useFitchProofStoreContext;
