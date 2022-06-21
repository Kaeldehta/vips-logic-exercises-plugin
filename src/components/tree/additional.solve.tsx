import useSemanticTreeStoreContext from "../../contexts/tree";
import { semanticTreeSchema } from "../../schemas/solve";
import Validator from "../Validator";

const TreeAdditionalSolve = () => {
  const [tree] = useSemanticTreeStoreContext();

  return <Validator values={tree} schema={semanticTreeSchema} />;
};

export default TreeAdditionalSolve;
