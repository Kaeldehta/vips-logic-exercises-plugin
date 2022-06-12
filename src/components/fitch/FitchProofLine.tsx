// import { FiMinusCircle } from "react-icons/fi";
import { FitchProofType } from "../../schemas/solve";
import FitchProofFromSelect from "./FitchProofFromSelect";
import Formula from "../Formula";
import FromArrayRule from "./FitchProofFromArrayRule";
import IconButton from "../IconButton";
import Indent from "./Indent";
import { untrack, Match } from "solid-js";
import useFitchProofStoreContext from "../../contexts/fitch";
import { produce } from "solid-js/store";

interface FitchProofLineProps {
  index: number,
  line: FitchProofType[number]
}

const FitchProofLine = (props: FitchProofLineProps) => {

  const [lines, set] = useFitchProofStoreContext();

  return <div class="group h-16 group min-w-fit flex justify-start gap-2 items-center">
    <div class="shrink-0 flex items-center w-12">{props.index + 1}</div>
    <Indent index={props.index} />
    {props.line.type !== "abs" ? <Formula name={`proof.${index}.formula`} /> : <span class="w-52 ">{"\u22A5"}</span>}
    {props.line.type === "rule" && <FromArrayRule index={index} />}
    {props.line.type === "prem" && <div>Prem.</div>}
    {props.line.type === "ass" && <div>Ass.</div>}
    {props.line.type === "abs" && <>
      <FitchProofFromSelect index={props.index} path="from0" />
      <FitchProofFromSelect index={props.index} path="from1" />
    </>}
    <IconButton onClick={() => {

      const line = lines[props.index];

      let deleteOffset = 0;

      if (line.type === "ass") {
        const indentation = line.indentation;
        for (let i = props.index + 1; i < lines.length; i++) {

          const current = lines[i];

          if (current.indentation < indentation || (current.indentation === indentation && current.type === "ass")) {
            break;
          }

          deleteOffset++;
        }
      }
      set({from: props.index, to: props.index + deleteOffset}, undefined as any);
    }}>-</IconButton>
  </div>
}

export default FitchProofLine;