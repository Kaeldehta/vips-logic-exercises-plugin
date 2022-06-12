import { createContext, useContext} from "solid-js"
import { FitchProofType } from "../schemas/solve"
import storeFactory from "../storeFactory";
import { RESPONSE } from "../utils";

const FitchProofContext = createContext(storeFactory<FitchProofType>(RESPONSE ?? []));

const useFitchProofStoreContext = () => useContext(FitchProofContext);

export default useFitchProofStoreContext;