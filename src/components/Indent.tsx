// import { FitchCalculusProof, LineId } from "../types"
import Border, { AssumptionBorder, LastPremiseBorder } from "./Border";


interface IndentProps {
    id: string
}

const Indent = ({id}: IndentProps) => {
    const indentation = 1;

    const assumption = true
    const lastPremise = true

    return <>{Array(indentation + 1).fill(0).map((_, index) => {
        if (assumption && index === indentation) return <AssumptionBorder key={index}/>
        if(lastPremise) return <LastPremiseBorder key={index}/>
        return <Border key={index}/>
    })}</>
}

export default Indent;
