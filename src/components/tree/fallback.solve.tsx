import useStoreContext from "../../context";
import { SemanticTreeType } from "../../schemas/tree";

const TreeFallbackSolve = () => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const start = () => set({ nodes: [{ type: "ass", formula: [] }] });

  return (
    <button type="button" onClick={start}>
      Start
    </button>
  );
};

export default TreeFallbackSolve;
