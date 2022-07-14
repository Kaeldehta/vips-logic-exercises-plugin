import useStoreContext from "../../../context";
import { SemanticTreeType } from "../../../schemas/tree";

const TreeCounterModelFallbackSolve = () => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const addCounterModel = () => set("countermodel", []);
  return (
    <button
      onClick={addCounterModel}
      type="button"
      class="bg-gray-100 rounded px-1 py-1 border-black border hover:bg-gray-200"
    >
      Add counter model
    </button>
  );
};

export default TreeCounterModelFallbackSolve;
