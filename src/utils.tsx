import { Line, LineId, Response } from "./types";

export const isAssumption = (line: Line) => {
    return line.formula !== undefined && !line.from.length && (line.indentation > 0 || line.indentation === undefined) && line.rule === undefined
}

export const isPremise = (line: Line) => {
    return line.formula !== undefined && !line.from.length && line.indentation === 0 && line.rule === undefined
}

export const isAbsurdity = (line: Line) => {
    return line.formula === undefined
}

export const isRuleLine = (line: Line) => {
    return line.rule !== undefined
}

export const findParent = (id: LineId, response: Response) => response.ids.find(
    (parentId) => response.lines[parentId].children[0] === id || response.lines[parentId].children[1] === id
);

export const charToHtml = {
    "i": <>&rarr;</>,
    "k": <>&and;</>,
    "l": <>&or;</>,
    "n": <>&not;</>,
    "o": <>&harr;</>,
    "u": <>&forall;</>,
    "e": <>&exist;</>,
    "1": <sub>1</sub>,
    "2": <sub>2</sub>,
    "3": <sub>3</sub>,
    "4": <sub>4</sub>,
    "5": <sub>5</sub>,
    "6": <sub>6</sub>,
    "7": <sub>7</sub>,
    "8": <sub>8</sub>,
    "9": <sub>9</sub>,
}

export const renderFormulaAsHTML = (formula: string) => {
    return Array.from(formula).map((c, index) => <div key={index}>{charToHtml[c]?? c}</div>)
}