import { none, State, useState } from "@hookstate/core"
import AbsurdityComponent from "./Absurdity"
import Assumption from "./Assumption"
import { isRuleLine, isSubproof, Subproof, SubproofLine, RuleLine, Absurdity } from "./domain"
import Inserter from "./Inserter"
import LineWrapper from "./LineWrapper"
import RuleLineComponent from "./RuleLine"
import { getSubProofLineCount } from "./utils"

type Props = {
    indentationLevel: number
    assumptionLineNumber: number
    subproofState: State<Subproof>
}

const SubproofComponent = ({indentationLevel, assumptionLineNumber, subproofState}: Props) => {

    let offset = assumptionLineNumber;

    const state = useState(subproofState);

    const insertLine = (index: number, line: SubproofLine) => state.lines.set(lines => [...lines.slice(0, index), line, ...lines.slice(index)])

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
        remove={() => state.set(none)}
        addBottom
    >
        <Assumption state={state.assumption} />
    </LineWrapper>
    <Inserter 
        indentationLevel={indentationLevel}
        addLine={() => insertRuleLine(assumptionLineNumber + 1)}
        addAbsurdity={() => insertAbsurdity(assumptionLineNumber + 1)}
        addSubproof={() => insertSubproof(assumptionLineNumber + 1)}
    />
    {state.lines.map((line, index) => {
        const lineNumber = offset + index + 1;
        if(isSubproof(line.value)) {
            offset += getSubProofLineCount(line.value);
            return <div key={index}>
            <SubproofComponent
                subproofState={line as State<Subproof>}
                indentationLevel={indentationLevel + 1}
                assumptionLineNumber={assumptionLineNumber}
            />
            <Inserter 
                indentationLevel={indentationLevel}
                addLine={() => insertRuleLine(index + 1)}
                addAbsurdity={() => insertAbsurdity(index + 1)}
                addSubproof={() => insertSubproof(index + 1)}
            />
            </div>
        }

        return <div key={index}>
            <LineWrapper
                height="h-12" 
                indentationLevel={indentationLevel} 
                head={lineNumber}
                remove={() => line.set(none)}
            >
            {isRuleLine(line.value) ? 
            <RuleLineComponent state={line as State<RuleLine>} max={lineNumber - 1}/> :
            <AbsurdityComponent state={line as State<Absurdity>} max={lineNumber - 1}/>
            }
        </LineWrapper>
        <Inserter 
            indentationLevel={indentationLevel}
            addLine={() => insertRuleLine(index + 1)}
            addAbsurdity={() => insertAbsurdity(index + 1)}
            addSubproof={() => insertSubproof(index + 1)}
        />
    </div>
    })}
    </>
}

export default SubproofComponent