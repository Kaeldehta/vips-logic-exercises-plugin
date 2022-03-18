import { FitchCalculusProofLine, Line, LineId, SemanticTree, Solution } from "./types";

export const isAssumption = (line: Line) => {
    return line.formula !== undefined && !line.from.length && (line as FitchCalculusProofLine).indentation !== 0 && line.rule === undefined
}

export const isPremise = (line: Line) => {
    return line.formula !== undefined && !line.from.length && (line as FitchCalculusProofLine).indentation === 0 && line.rule === undefined
}

export const isAbsurdity = (line: Line) => {
    return line.formula === undefined
}

export const isRuleLine = (line: Line) => {
    return line.rule !== undefined
}

export const findParent = (id: LineId, solution: Solution) => solution.ids.find(
    (parentId) => solution.lines[parentId].children[0] === id || solution.lines[parentId].children[1] === id
);

export const isSemanticTree = (response: Solution): response is SemanticTree => (response as SemanticTree).root !== undefined;

export const charToHtml = {
    "i": <div className="mx-1">&rarr;</div>,
    "k": <div className="mx-1">&and;</div>,
    "l": <div className="mx-1">&or;</div>,
    "=": <div className="mx-1">=</div>,
    "n": <>&not;</>,
    "o": <div className="mx-1">&harr;</div>,
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
    return Array.from(formula).map((c, index) => <div className="last:group-focus:text-red-500" key={index}>{charToHtml[c]?? c}</div>)
}