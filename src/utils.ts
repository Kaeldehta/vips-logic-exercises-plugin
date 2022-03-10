import { Line } from "./types";

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
