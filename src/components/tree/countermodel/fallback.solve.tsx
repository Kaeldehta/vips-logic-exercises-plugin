import useStoreContext from "../../../context";
import { SemanticTreeType } from "../../../schemas/tree";
import TextButton from "../../TextButton";

const TreeCounterModelFallbackSolve = () => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const addCounterModel = () => set("countermodel", []);
  return <TextButton onClick={addCounterModel}>Add counter model</TextButton>;
};

export default TreeCounterModelFallbackSolve;
