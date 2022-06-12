import { createContext, useContext} from "solid-js"
import { SemanticTreeType } from "../schemas/solve"
import storeFactory from "../storeFactory";
import { TASK } from "../utils";

const SemanticTreeStoreContext = createContext(storeFactory(TASK as SemanticTreeType));

const useSemanticTreeStoreContext = () => useContext(SemanticTreeStoreContext);

export default useSemanticTreeStoreContext;