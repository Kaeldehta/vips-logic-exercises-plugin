type LineId = string;

export interface Response {
    root: Node
}

export interface Branch {
    left: Node
    right: Node
}

export interface Node {
    id: LineId
    line: Line
    next?: Node | Branch
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

export const rules = ["NC", "ND"] as const;

export interface RuleApplication {
    formula: string
    rule?: typeof rules[number]
    from: {
        line?: string
    }
}

export type Line = Assumption | Falsum | RuleApplication;