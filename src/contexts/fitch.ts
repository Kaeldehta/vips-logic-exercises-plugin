import { createContext, useContext} from "solid-js"
import { FitchProofType } from "../schemas/solve"
import storeFactory from "../storeFactory";
import { TASK } from "../utils";

const FitchProofContext = createContext(storeFactory(TASK as FitchProofType));

const useFitchProofStoreContext = () => useContext(FitchProofContext);

export default useFitchProofStoreContext;