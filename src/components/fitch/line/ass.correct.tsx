import { FitchAssumptionType } from "../../../schemas/solve";
import FormulaRender from "../../FormulaRender";

const FitchLineAssCorrect = (props: { line: FitchAssumptionType }) => {
  return (
    <>
      <div class="shrink-0 w-52 min-w-fit h-12 px-2 py-1 flex items-center justify-start">
        <FormulaRender value={props.line.formula} />
      </div>
      <span>Ass</span>
    </>
  );
};

export default FitchLineAssCorrect;
