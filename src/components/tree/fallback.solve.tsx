import useSemanticTreeStoreContext from "../../contexts/tree";

const TreeFallbackSolve = () => {
  const [, set] = useSemanticTreeStoreContext();

  const start = () => set([{ type: "ass", formula: "" }]);

  return (
    <button type="button" onClick={start}>
      Start
    </button>
  );
};

export default TreeFallbackSolve;
