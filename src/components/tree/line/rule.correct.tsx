import { TreeRuleType } from "../../../schemas/tree";
import FormulaRender from "../../FormulaRender";

const TreeLineCorrectRule = (props: { line: TreeRuleType }) => {
  return (
    <>
      <div class="shrink-0 w-52 min-w-fit h-12 px-2 py-1 flex items-center justify-start">
        <FormulaRender value={props.line.formula} />
      </div>
      {"from"}
      <span>
        {"("}
        {props.line.from[0] + 1}
        {")"}
      </span>
      {"by"}
      <span>{props.line.rule}</span>
    </>
  );
};

export default TreeLineCorrectRule;
