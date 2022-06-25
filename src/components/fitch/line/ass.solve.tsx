import { ParentProps } from "solid-js";
import { FitchAssumptionType } from "../../../schemas/solve";
import FitchFormula from "./FitchFormula";

const FitchLineAssSolve = (
  props: ParentProps<{
    line: FitchAssumptionType;
    index: number;
  }>
) => {
  return (
    <>
      <FitchFormula value={props.line.formula} index={props.index} />
      {props.children}
      <span>Ass.</span>
    </>
  );
};

export default FitchLineAssSolve;
