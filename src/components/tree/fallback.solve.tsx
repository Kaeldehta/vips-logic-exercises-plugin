import { createUniqueId } from "solid-js";
import useStoreContext from "../../context";
import { SemanticTreeType } from "../../schemas/tree";
import TextButton from "../TextButton";

const TreeFallbackSolve = () => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const start = () =>
    set({ nodes: [{ type: "ass", formula: [], id: createUniqueId() }] });

  return <TextButton onClick={start}>Start with assumption</TextButton>;
};

export default TreeFallbackSolve;
