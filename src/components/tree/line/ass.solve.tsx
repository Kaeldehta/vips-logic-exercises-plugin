import { TreeAssumptionType } from "../../../schemas/solve";
import TreeFormula from "./TreeFormula";

const TreeLineSolveAss = (props: {
  line: TreeAssumptionType;
  index: number;
}) => {
  return (
    <>
      <TreeFormula value={props.line.formula} index={props.index} />
      <span>Ass</span>
    </>
  );
};

export default TreeLineSolveAss;
