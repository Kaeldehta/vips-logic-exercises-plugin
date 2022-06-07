import { Controller, UseFieldArrayRemove, useFormContext } from "react-hook-form";
import { FitchProofType } from "../schemas";
import { useFieldArrayContext } from "./FieldArrayProvider";
import FitchProofFromSelect from "./FitchProofFromSelect";
import Formula from "./Formula";
import FromArrayRule from "./FromArrayRule";
import FromSelect from "./FromSelect";
import Indent from "./Indent";
import useType from "./useType";

interface FitchProofLineProps {
  index: number,
  remove: UseFieldArrayRemove
}

const FitchProofLine = ({ index, remove }: FitchProofLineProps) => {

  const { register, getValues } = useFormContext<FitchProofType>();

  const type = useType(index);

  return <div className="h-16 group min-w-fit flex justify-start gap-2 items-center">
    <div className="shrink-0 flex items-center w-12">{index + 1}</div>
    <Indent index={index} />
    {type !== "abs" ? <Formula name={`proof.${index}.formula`} /> : <span className="w-52 ">{"\u22A5"}</span>}
    {type === "rule" && <FromArrayRule index={index} />}
    {type === "abs" && <>
      <FitchProofFromSelect index={index} path="from0" />
      <FitchProofFromSelect index={index} path="from1" />
    </>}
    <button type="button" onClick={() => {
      const lines = getValues("proof");

      const line = lines[index];

      if (line.type === "ass") {
        let indices = [index];
        const indentation = line.indentation;
        for (let i = index + 1; i < lines.length; i++) {

          const current = lines[i];

          if (current.indentation < indentation || (current.indentation === indentation && current.type === "ass")) {
            break;
          }

          indices.push(i);
        }
        remove(indices);
      } else {
        remove(index)
      }
    }}>Remove</button>
  </div>
}

export default FitchProofLine;