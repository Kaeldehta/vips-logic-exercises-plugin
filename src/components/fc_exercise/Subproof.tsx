import Absurdity from "./Absurdity"
import Assumption from "./Assumption"
import { isRuleLine, isSubproof, Subproof, SubproofLine } from "./domain"
import LineWrapper from "./LineWrapper"
import RuleLine from "./RuleLine"
import { getSubProofLineCount } from "./utils"

type Props = Subproof & {
    indentationLevel: number
    assumptionLineNumber: number
    setSubproof: (subproof: Subproof) => void
}

const SubproofComponent = ({assumption, lines, indentationLevel, assumptionLineNumber, setSubproof}: Props) => {

    let offset = assumptionLineNumber;

    const setLine = (index: number, line: SubproofLine) => {
        const copy = [...lines];
        copy[index] = line;
        setSubproof({assumption: assumption, lines: copy});
    }

    return <>
    <LineWrapper height="h-12" indentationLevel={indentationLevel} head={assumptionLineNumber}>
        <Assumption assumption={assumption} setAssumption={(assumption) => setSubproof({lines: lines, assumption: assumption})}/>
    </LineWrapper>
    {lines.map((line, index) => {
        const lineNumber = offset + index + 1;
        if(isSubproof(line)) {
            offset += getSubProofLineCount(line);
            return <SubproofComponent key={index} {...line} indentationLevel={indentationLevel + 1} setSubproof={(subproof) => setLine(index, subproof)} assumptionLineNumber={lineNumber}/>
        }

        return <LineWrapper height="h-12" indentationLevel={indentationLevel} head={lineNumber}>
            {isRuleLine(line) ? 
            <RuleLine {...line} max={lineNumber - 1} setRuleLine={(ruleLine) => setLine(index, ruleLine)}/> :
            <Absurdity {...line} max={lineNumber - 1} setAbsurdity={(absurdity) => setLine(index, absurdity)}/>
            }
        </LineWrapper>
    })}
    </>
}

export default SubproofComponent