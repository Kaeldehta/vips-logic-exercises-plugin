import { useWatch } from "react-hook-form";
import { FitchProofType } from "../schemas";
import Border, { AssumptionBorder, LastPremiseBorder } from "./Border";

interface IndentProps {
  index: number
}

const Indent = ({ index }: IndentProps) => {

  const indentation = useWatch<FitchProofType>({ name: `proof.${index}.indentation` }) as number;

  const type = useWatch<FitchProofType>({ name: `proof.${index}.type` });

  const nextType = useWatch<FitchProofType>({ name: `proof.${index + 1}.type` });

  const lastPremise = type === "prem" && nextType !== "prem";

  return <>
    {Array(indentation + 1).fill(0).map((_, index) => {
      if (lastPremise) return <LastPremiseBorder key={index} />
      if (type === "ass" && index == indentation) return <AssumptionBorder key={index} />
      return <Border key={index} />
    })}
  </>
}

export default Indent;