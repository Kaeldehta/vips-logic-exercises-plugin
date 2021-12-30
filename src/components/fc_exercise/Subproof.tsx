import Absurdity from "./Absurdity"
import Assumption from "./Assumption"
import { isRuleLine, isSubproof, Subproof, SubproofLine } from "./domain"
import Inserter from "./Inserter"
import LineWrapper from "./LineWrapper"
import RuleLine from "./RuleLine"
import { getSubProofLineCount } from "./utils"

type Props = Subproof & {
    indentationLevel: number
    assumptionLineNumber: number
    setSubproof: (subproof: Subproof) => void
    removeSubproof: () => void
}

const SubproofComponent = ({assumption, lines, indentationLevel, assumptionLineNumber, setSubproof, removeSubproof}: Props) => {

    let offset = assumptionLineNumber;

    const setLine = (index: number, line: SubproofLine) => {
        const copy = [...lines];
        copy[index] = line;
        setSubproof({assumption: assumption, lines: copy});
    }

    const removeLine = (index: number) => setSubproof({
        assumption: assumption,
        lines: [...lines.slice(0, index), ...lines.slice(index + 1)]
    })

    const insertLine = (index: number, line: SubproofLine) => setSubproof({
        assumption: assumption,
        lines: [...lines.slice(0, index), line, ...lines.slice(index)]
    })

    const insertAbsurdity = (index: number) => insertLine(index, {})

    const insertRuleLine = (index: number) => insertLine(index, {
        formula: ""
    })

    const insertSubproof = (index: number) => insertLine(index, {
        assumption: "",
        lines: []
    })

    return <>
    <LineWrapper 
        height="h-12"
        indentationLevel={indentationLevel}
        head={assumptionLineNumber}
        remove={removeSubproof}
        addBottom
    >
        <Assumption assumption={assumption} setAssumption={(assumption) => setSubproof({lines: lines, assumption: assumption})}/>
    </LineWrapper>
    <Inserter 
        indentationLevel={indentationLevel}
        addLine={() => insertRuleLine(assumptionLineNumber + 1)}
        addAbsurdity={() => insertAbsurdity(assumptionLineNumber + 1)}
        addSubproof={() => insertSubproof(assumptionLineNumber + 1)}
    />
    {lines.map((line, index) => {
        const lineNumber = offset + index + 1;
        if(isSubproof(line)) {
            offset += getSubProofLineCount(line);
            return <>
            <SubproofComponent 
                key={index} 
                {...line} 
                indentationLevel={indentationLevel + 1}
                setSubproof={(subproof) => setLine(index, subproof)}
                assumptionLineNumber={lineNumber}
                removeSubproof={() => removeLine(index)}
            />
            <Inserter 
                key={index}
                indentationLevel={indentationLevel}
                addLine={() => insertRuleLine(index + 1)}
                addAbsurdity={() => insertAbsurdity(index + 1)}
                addSubproof={() => insertSubproof(index + 1)}
            />
            </>
        }

        return <>
            <LineWrapper
                height="h-12" 
                indentationLevel={indentationLevel} 
                head={lineNumber}
                remove={() => removeLine(index)}
            >
            {isRuleLine(line) ? 
            <RuleLine {...line} max={lineNumber - 1} setRuleLine={(ruleLine) => setLine(index, ruleLine)}/> :
            <Absurdity {...line} max={lineNumber - 1} setAbsurdity={(absurdity) => setLine(index, absurdity)}/>
            }
        </LineWrapper>
        <Inserter 
            key={index}
            indentationLevel={indentationLevel}
            addLine={() => insertRuleLine(index + 1)}
            addAbsurdity={() => insertAbsurdity(index + 1)}
            addSubproof={() => insertSubproof(index + 1)}
        />
    </>
    })}
    </>
}

export default SubproofComponent