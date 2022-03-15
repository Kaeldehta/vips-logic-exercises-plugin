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

