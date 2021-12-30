import { useState } from "react";
import {isSubproof, Premise, Proof, ProofLine, RuleLine, Subproof} from "./domain"
import PremiseComponent from "./Premise";
import SubproofComponent from "./Subproof";
import RuleLineComponent from "./RuleLine";
import LineWrapper from "./LineWrapper";
import { getSubProofLineCount } from "./utils";
import Inserter from "./Inserter";

export default ({lines: defaultLines, premises: defaultPremises}: Proof) => {

    const [premises, setPremises] = useState(defaultPremises?? []);

    const [lines, setLines] = useState(defaultLines?? []);

    const addPremise = () => setPremises(premises => [...premises, ""]);

    const setPremise = (index: number, premise: Premise) => setPremises(premises => {
        const copy = [...premises];
        copy[index] = premise;
        return copy;
    })

    const removePremise = (index: number) => setPremises(premises => [...premises.slice(0, index), ...premises.slice(index + 1)]);

    const removeLine = (index: number) => setLines(lines => [...lines.slice(0, index), ...lines.slice(index + 1)]);

    const insertLine = (index: number, line: ProofLine) => setLines(lines => [...lines.slice(0, index), line, ...lines.slice(index)]);

    const insertSubproof = (index: number) => insertLine(index, {
        assumption: "",
        lines: []
    });

    const insertRuleLine = (index: number) => insertLine(index, {
        formula: ""
    });

    const setLine = (index: number, line: ProofLine) => setLines(lines => {
        const copy = [...lines];
        copy[index] = line;
        return copy;
    });

    let offset = premises.length;

    return <div>

        <input type="hidden" name="premises" value={JSON.stringify(premises)} />
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />
        
        {premises.map((premise, index) => <LineWrapper key={index} height="h-12" indentationLevel={0} head={index + 1}>
            <PremiseComponent premise={premise} setPremise={(premise) => setPremise(index, premise)}/>
        </LineWrapper>)}
        <Inserter indentationLevel={0} addPremise={addPremise} addAssumption={() => insertSubproof(0)}/>
        {lines.map((line, index) => {
            const lineNumber = offset + index + 1;
            
            if(isSubproof(line)) {
                offset += getSubProofLineCount(line);
                return <SubproofComponent key={index} {...line} indentationLevel={1}  assumptionLineNumber={lineNumber} setSubproof={(subProof) => setLine(index, subProof)}/>
            }
            return <LineWrapper key={index} height="h-12" indentationLevel={0} head={lineNumber}>
                <RuleLineComponent {...line} setRuleLine={(line) => setLine(index, line)} max={lineNumber - 1}/>
            </LineWrapper>
        })}
    
    </div>
}