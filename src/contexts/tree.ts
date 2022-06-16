import { createContext, useContext } from "solid-js";
import { SemanticTreeType } from "../schemas/solve";
import storeFactory from "../storeFactory";

const SemanticTreeStoreContext = createContext(
  storeFactory<SemanticTreeType>(
    (RESPONSE as SemanticTreeType | undefined) ?? []
  )
);

const useSemanticTreeStoreContext = () => useContext(SemanticTreeStoreContext);

export default useSemanticTreeStoreContext;
