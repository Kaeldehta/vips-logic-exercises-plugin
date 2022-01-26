import { Task } from "../domain";

type LineId = string;

export interface Response {
    root: Node
}

export interface Node {
    id: LineId
    line: Line
    left?: Node
    right?: Node
}

export interface Assumption {
    formula: string
}

export interface Falsum {
    from: {
        line1?: string
        line2?: string
    }
}

export const propRules = ["NC", "ND", "D", "C", "MC", "NMC", "NB", "B", "DN", "F"] as const;
export const predRules = [...propRules, "UQ", "NUQ", "EQ", "NEQ", "IS", "NIS"] as const;

export interface RuleApplication {
    formula: string
    rule?: typeof predRules[number]
    from: {
        line?: string
    }
}

export type Line = Assumption | Falsum | RuleApplication;
