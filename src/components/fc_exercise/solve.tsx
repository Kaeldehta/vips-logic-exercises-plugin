import {isSubproof, Premise, Proof, ProofLine, RuleLine, Subproof} from "./domain"
import PremiseComponent from "./Premise";
import SubproofComponent from "./Subproof";
import RuleLineComponent from "./RuleLine";
import LineWrapper from "./LineWrapper";
import { getSubProofLineCount } from "./utils";
import Inserter from "./Inserter";

import {useState, State, none} from "@hookstate/core";

export default ({lines: defaultLines, premises: defaultPremises}: Proof) => {

    const premisesState = useState(defaultPremises?? []);

    const linesState = useState(defaultLines?? []);

    const addPremise = () => premisesState[premisesState.length].set(""
    )

    // const removePremise = (index: number) => setPremises(premises => [...premises.slice(0, index), ...premises.slice(index + 1)]);

    // const removeLine = (index: number) => setLines(lines => [...lines.slice(0, index), ...lines.slice(index + 1)]);
    const insertLine = (index: number, line: ProofLine) => linesState.set(lines => [...lines.slice(0, index), line, ...lines.slice(index)]);

    const insertSubproof = (index: number) => insertLine(index, {
        assumption: "",
        lines: []
    });

    const insertRuleLine = (index: number) => insertLine(index, {
        formula: ""
    });

    let offset = premisesState.length;

    return <div>

        <input type="hidden" name="premises" value={JSON.stringify(premisesState.value)} />
        <input type="hidden" name="lines" value={JSON.stringify(linesState.value)} />

        {premisesState.map((premiseState, index) => 
        <><LineWrapper 
            key={index}
            height="h-12"
            indentationLevel={0}
            head={index + 1}
            remove={() => premisesState[index].set(none)}
            addBottom={index == premisesState.length - 1}
        >
            <PremiseComponent state={premiseState}/>
        </LineWrapper>
        {index < premisesState.length - 1 &&
        <Inserter indentationLevel={0}/>
        }
        </>
        )}

        <Inserter 
            indentationLevel={0}
            addPremise={addPremise}
            addSubproof={() => insertSubproof(0)}
            addLine={() => insertRuleLine(0)}
        />  
        
        {linesState.map((lineState, index) => {
            const lineNumber = offset + index + 1;
            
            if(isSubproof(lineState.value)) {
                offset += getSubProofLineCount(lineState.value);
                return <div key={index}>
                    <SubproofComponent
                        subproofState={lineState as State<Subproof>}
                        indentationLevel={1} 
                        assumptionLineNumber={lineNumber}
                    />
                    <Inserter
                        indentationLevel={0}
                        addSubproof={() => insertSubproof(index + 1)}
                        addLine={() => insertRuleLine(index + 1)}
                    />
                </div>
            }
            return <div key={index}>
            <LineWrapper
                height="h-12" 
                indentationLevel={0} 
                head={lineNumber}
                remove={() => lineState.set(none)}
            >
                <RuleLineComponent state={lineState as State<RuleLine>} max={lineNumber - 1}/>
            </LineWrapper>
            <Inserter
                indentationLevel={0}
                addSubproof={() => insertSubproof(index + 1)}
                addLine={() => insertRuleLine(index + 1)}
            />
            </div>
        })}
    
    </div>
}