import { createContext, useContext, Context } from "react";
import { Line, LineWithFormula, Absurdity, RuleApplication, Rule } from "./domain";

interface LineContextType {
    setLine: (line: Line) => void,
    line: Line,
    lineNumber: number,
    removeLine?: () => void,
    addLine?: () => void,
    addPremise? : () => void,
    addAssumption? : () => void,
    addAbsurdity?: () => void,
}

export const LineContext: Context<LineContextType> = createContext(
    {
        setLine: (line: Line) => {},
        line: {
            formula: "",
            indentationLevel: 0
        } as Line,
        lineNumber: 0
    }
);


export const useLine = () => useContext(LineContext);

export const useFormula = () => {
    const {line, setLine} = useLine();
    const lineWithFormula = line as LineWithFormula;
    const setFormula = (newFormula: LineWithFormula["formula"]) => setLine({...lineWithFormula, formula: newFormula});
    return {
        formula: lineWithFormula.formula,
        setFormula: setFormula,
    }
}

export const useAbsurdity = () => {
    const {line, lineNumber, setLine}= useLine();

    const abs = line as Absurdity;

    const setLine1 = (newLine: Absurdity["from"]["line1"]) => setLine({...abs, from: {
        ...abs.from,
        line1: newLine
    }});

    const setLine2 = (newLine: Absurdity["from"]["line2"]) => setLine({...line, from: {
        ...abs.from,
        line2: newLine
    }});

    return {
        lineNumber: lineNumber,
        useLine1: () => ({
            lineNumber: abs.from.line1,
            setLineNumber: setLine1
        }),
        useLine2: () => ({
            lineNumber: abs.from.line2,
            setLineNumber: setLine2
        })
    }
}

export const useRuleApplication = () => {

    const {line, setLine, lineNumber} = useLine();

    const ruleLine = line as RuleApplication;

    const setRule = (rule: Rule["rule"]) => setLine({...ruleLine, from: {
        ...ruleLine.from,
        rule: rule
    }})

    const setLine1 = (newLine: Rule["line1"]) => setLine({...ruleLine, from: {
        ...ruleLine.from,
        line1: newLine
    }});

    const setLine2 = (newLine: Rule["line2"]) => setLine({...ruleLine, from: {
        ...ruleLine.from,
        line2: newLine,
    }});

    return {
        lineNumber: lineNumber,
        rule: ruleLine.from.rule,
        useLine1: () => ({
            lineNumber: ruleLine.from.line1,
            setLineNumber: setLine1
        }),
        useLine2: () => ({
            lineNumber: ruleLine.from.line2,
            setLineNumber: setLine2
        }),
        setRule: setRule,
    }
}