import LineInput from "../LineInput"
import { Absurdity } from "./domain";

type Props = Absurdity & {
    setAbsurdity: (absurdity: Absurdity) => void,
    max: number
}

export default ({line1, line2, setAbsurdity, max}: Props) => {
    
    return <>
    <div className="w-52 flex items-center justify-start">{"\u22A5"}</div>
    <div className="w-32 flex items-center justify-start">Abs.</div>
    <LineInput max={max} lineNumber={line1} setLineNumber={(lineNumber) => setAbsurdity({line1: lineNumber, line2: line2})}/>
    <LineInput max={max} lineNumber={line2} setLineNumber={(lineNumber) => setAbsurdity({line1: line1, line2: lineNumber})}/>
    </>
}