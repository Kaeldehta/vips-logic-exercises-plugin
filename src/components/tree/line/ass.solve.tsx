import useSemanticTreeStoreContext from "../../../contexts/tree";
import { TreeAssumptionType } from "../../../schemas/solve";
import Formula from "../../Formula";

const TreeLineSolveAss = (props: {
  line: TreeAssumptionType;
  index: number;
}) => {
  const [, set] = useSemanticTreeStoreContext();

  return (
    <>
      <Formula
        name={`response[${props.index}][formula]`}
        value={props.line.formula}
        setValue={(v) => set(props.index, "formula" as never, v as never)}
      />
      <span>Ass</span>
    </>
  );
};

export default TreeLineSolveAss;
