import { ParentProps } from "solid-js";
import { FitchLineProps } from ".";
import Inserter from "../Inserter";

const FitchLineWrapperSolve = (props: ParentProps<FitchLineProps>) => {
  return (
    <div class="flex flex-col group hover:bg-gray-100 rounded-md">
      {props.children}
      <Inserter
        index={props.index}
        type={props.line.type}
        indentation={props.line.indentation}
      />
    </div>
  );
};

export default FitchLineWrapperSolve;
