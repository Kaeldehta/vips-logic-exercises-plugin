import { useAtomValue } from "jotai";
import { indentationAtom } from "../solve/atoms/fc";
import { FCProof, FCProofLine } from "../types/fc";
import Border, { AssumptionBorder, LastPremiseBorder } from "./Border";


interface IndentProps {
    id: string
}

const Indent = ({id}: IndentProps) => {
    const indentation = useAtomValue(indentationAtom(id));

    const assumption = true;
    const lastPremise = true

    return <>{Array(indentation + 1).fill(0).map((_, index) => {
        if (assumption && index === indentation) return <AssumptionBorder key={index}/>
        if(lastPremise) return <LastPremiseBorder key={index}/>
        return <Border key={index}/>
    })}</>
}

export default Indent;
