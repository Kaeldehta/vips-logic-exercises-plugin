import { createContext, useContext } from "solid-js";
import { semanticTreeSchema, SemanticTreeType } from "../schemas/solve";
import storeFactory from "../storeFactory";

const SemanticTreeStoreContext = createContext(
  storeFactory<SemanticTreeType>(semanticTreeSchema.parse(RESPONSE))
);

const useSemanticTreeStoreContext = () => useContext(SemanticTreeStoreContext);

export default useSemanticTreeStoreContext;
