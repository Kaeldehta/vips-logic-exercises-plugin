import { FCProofLine } from "../types/fc";


export const isAssumption = (line: FCProofLine) => {
    return line.formula !== undefined && !line.from.length && line.indentation !== 0 && line.rule === undefined
}

export const isPremise = (line: FCProofLine) => {
    return line.formula !== undefined && !line.from.length && line.indentation === 0 && line.rule === undefined
}