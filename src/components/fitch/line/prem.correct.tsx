import { ParentProps } from "solid-js";
import { FitchPremiseType } from "../../../schemas/fitch";
import FormulaRender from "../../FormulaRender";

const FitchLinePremCorrect = (
  props: ParentProps<{ line: FitchPremiseType }>
) => {
  return (
    <>
      <div class="shrink-0 w-52 min-w-fit h-12 px-2 py-1 flex items-center justify-start">
        <FormulaRender value={props.line.formula} />
      </div>
      {props.children}
      <span>Prem.</span>
    </>
  );
};

export default FitchLinePremCorrect;
