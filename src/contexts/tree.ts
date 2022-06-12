import { createContext, useContext} from "solid-js"
import { SemanticTreeType } from "../schemas/solve"
import storeFactory from "../storeFactory";
import { RESPONSE } from "../utils";

const SemanticTreeStoreContext = createContext(storeFactory(RESPONSE as SemanticTreeType));

const useSemanticTreeStoreContext = () => useContext(SemanticTreeStoreContext);

export default useSemanticTreeStoreContext;