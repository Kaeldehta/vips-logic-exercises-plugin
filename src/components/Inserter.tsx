import { useEffect } from "react";
import { UseFieldArrayInsert, useWatch } from "react-hook-form";
import { FitchProofType } from "../schemas";
import Border from "./Border";
import { FiArrowDownCircle, FiArrowRightCircle, FiPlusCircle } from "react-icons/fi"
import IconButton from "./IconButton";

interface InserterProps {
  index: number
  insert: UseFieldArrayInsert<FitchProofType>
}

const Inserter = ({ index, insert }: InserterProps) => {

  const indentation = useWatch<FitchProofType>({ name: `proof.${index}.indentation` }) as number;

  const type = useWatch<FitchProofType>({ name: `proof.${index}.type` });

  const nextType = useWatch<FitchProofType>({ name: `proof.${index + 1}.type` });

  const nextIndentation = useWatch<FitchProofType>({ name: `proof.${index + 1}.indentation` }) as number;

  const indentationDelta = nextType ? (nextType === "ass" ? (nextIndentation > indentation ? 0 : -indentation) : nextIndentation - indentation) : -indentation;

  return <>
    {Array(-Math.min(indentationDelta, 0) + 1).fill(0).map((_, indentationOffset) => {
      const newIndentation = indentation - indentationOffset;

      return <div key={indentationOffset} className="h-16 group min-w-fit flex justify-start gap-2 items-center">
        <div className="w-12"></div>
        {Array(newIndentation + 1).fill(0).map((_, index) => <Border key={index} />)}
        <div className="w-52 border-2 p-1 border-white border-solid flex justify-evenly">
          {(type !== "prem" || nextType !== "prem") && <>
            <IconButton onClick={() => insert(index + 1, { type: "ass", indentation: newIndentation + 1 })}><FiArrowRightCircle /></IconButton>
            <IconButton type="button" onClick={() => insert(index + 1, { type: "rule", indentation: newIndentation })}><FiArrowDownCircle /></IconButton>
            {newIndentation > 0 && <IconButton type="button" onClick={() => insert(index + 1, { type: "abs", indentation: newIndentation })}>{"\u22A5"}</IconButton>}
          </>}
          {type === "prem" && <IconButton type="button" onClick={() => insert(index + 1, { type: "prem", indentation: 0 })}><FiPlusCircle /></IconButton>}
        </div>
      </div>
    })}
  </>
}

export default Inserter;