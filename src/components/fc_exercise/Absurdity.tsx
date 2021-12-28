import LineInput from "../LineInput"
import { useAbsurdity } from "./context";

export default () => {

    const {lineNumber, useLine1, useLine2} = useAbsurdity();
    
    return <>
    <div className="w-52 flex items-center justify-start">{"\u22A5"}</div>
    <div className="w-32 flex items-center justify-start">Abs.</div>
    <LineInput max={lineNumber} useLineNumber={useLine1}/>
    <LineInput max={lineNumber} useLineNumber={useLine2}/>
    </>
}