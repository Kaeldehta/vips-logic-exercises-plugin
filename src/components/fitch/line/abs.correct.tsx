import { ParentProps } from "solid-js";
import { FitchAbsurdityType } from "../../../schemas/fitch";

const FitchLineAbsCorrect = (
  props: ParentProps<{ line: FitchAbsurdityType }>
) => {
  return (
    <>
      <span class="w-52 ">{"\u22A5"}</span>
      {props.children}
      <div class="w-10">{props.line.from[0] + 1}</div>
      <div class="w-10">{props.line.from[1] + 1}</div>
    </>
  );
};

export default FitchLineAbsCorrect;
