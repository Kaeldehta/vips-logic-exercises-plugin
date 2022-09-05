import { ParentProps } from "solid-js";
import { FitchPremiseType } from "../../../schemas/fitch";
import FitchFormula from "./FitchFormula";

const FitchLinePremSolve = (
  props: ParentProps<{
    line: FitchPremiseType;
    index: number;
  }>
) => {
  return (
    <>
      <FitchFormula value={props.line.formula} index={props.index} />
      {props.children}
      <span>Prem.</span>
    </>
  );
};

export default FitchLinePremSolve;
