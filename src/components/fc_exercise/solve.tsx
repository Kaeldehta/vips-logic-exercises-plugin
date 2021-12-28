import { useMemo, useState } from "react";
import Line from "./Line"
import {Line as LineType, isPremise, isAssumption, isAbsurdity} from "./domain"
import Button from "../Button";
import { LineContext } from "./context";
import Inserter from "./Inserter";
import Border from "./Border"
import LineWrapper from "./LineWrapper"

interface Props {
    lines: Array<LineType>
}

export default ({lines: defaultLines}: Props) => {

    const [lines, setLines] = useState(defaultLines ?? []);

    const addLine = (newLine: LineType) => setLines(lines => [...lines, newLine]);

    const setLine = (index: number, newLine: LineType) => setLines(lines => {
        const copy = [...lines];
        copy[index] = newLine;
        return copy;
    });

    const removeLine = (index: number) => setLines(lines => {
        const copy = [...lines];
        const line = copy[index];
        let i = 1;

        if(isAssumption(line)) {
            while(i < copy.length - index) {
                const {indentationLevel} = copy[index + i];
                if(indentationLevel != line.indentationLevel) {
                    break;
                }
                i++;
            }
        }
        
        copy.splice(index, i);
        return copy;
    });
 
    const last = useMemo(() => lines.length - 1, [lines.length]);

    const lastIndent = useMemo(() => lines[last]?.indentationLevel ?? 0, [last]);

    return <div>

        <Button reset onClick={() => setLines(defaultLines)}>Reset</Button>

        <input type="hidden" name="lines" value={JSON.stringify(lines)} />
        
        <LineWrapper height="h-4">
            <Border addBottom/>
        </LineWrapper>
        <Inserter indentationLevel={0}/>
        {lines.map((line, index) => <LineContext.Provider key={index} value={
            {
                line: line, 
                lineNumber: 
                index, 
                setLine: (newLine) => setLine(index, newLine),
                removeLine: () => removeLine(index)
            }}>
            <Line/>
            </LineContext.Provider>)}
        {(last <= 0 || isPremise(lines[last])) && 
            <Button onClick={() => addLine({
                indentationLevel: lastIndent, formula: "",
                from: {
                    rule: "prem",
                }
            })}>Add Premise</Button>
        }
        {last >= 0 && 
            <Button onClick={() => addLine({indentationLevel: lastIndent, formula: "", from: {}})}>Add Line</Button>
        }
        <Button onClick={() => addLine({indentationLevel: lastIndent + 1, formula: "", from: {rule: "ass"}})}>Add Assumption</Button>
        {lastIndent != 0 && !isAbsurdity(lines[last]) && 
        <Button onClick={() => {
            addLine({indentationLevel: lastIndent, from: {
                rule: "abs"
            }});
            addLine({indentationLevel: lastIndent - 1, formula: "", from: {}});
        }}>{"\u22A5"}</Button>}
    </div>
}