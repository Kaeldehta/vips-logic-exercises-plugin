import { useEffect } from "react";
import { UseFieldArrayInsert, useWatch } from "react-hook-form";
import { FitchProofType } from "../schemas";
import Border from "./Border";
import { FiArrowDownCircle, FiArrowRightCircle, FiPlusCircle } from "react-icons/fi"

interface InserterProps {
  index: number
  insert: UseFieldArrayInsert<FitchProofType>
}

const InserterButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {

  return <button {...props} type="button" className="group-hover:flex hidden items-center justify-center w-10 h-10"></button>
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
            <InserterButton onClick={() => insert(index + 1, { type: "ass", indentation: newIndentation + 1 })}><FiArrowRightCircle /></InserterButton>
            <InserterButton type="button" onClick={() => insert(index + 1, { type: "rule", indentation: newIndentation })}><FiArrowDownCircle /></InserterButton>
            {newIndentation > 0 && <InserterButton type="button" onClick={() => insert(index + 1, { type: "abs", indentation: newIndentation })}>{"\u22A5"}</InserterButton>}
          </>}
          {type === "prem" && <InserterButton type="button" onClick={() => insert(index + 1, { type: "prem", indentation: 0 })}><FiPlusCircle /></InserterButton>}
        </div>
      </div>
    })}
  </>
}

export default Inserter;