import useStoreContext from "../../context";
import semanticTreeSchema, { SemanticTreeType } from "../../schemas/tree";
import Validator from "../Validator";

const TreeAdditionalSolve = () => {
  const [tree] = useStoreContext<SemanticTreeType>();

  return <Validator values={tree} schema={semanticTreeSchema} />;
};

export default TreeAdditionalSolve;
