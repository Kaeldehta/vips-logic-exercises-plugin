export interface Answer {
    consequence: string,
    statements: {
        ids: Array<string>
        entries: Record<string, string>
    },
    predicateLogic: boolean
}

export type LineId = string

export interface Line {
    formula?: string
    indentation?: number
    rule?: string | null
    children: [LineId] | [LineId, LineId] | []
    from: Array<LineId | null>
}

export interface Response {
    lines: Record<LineId, Line>
    ids: Array<LineId>
}

export interface Store {
    response: Response
    answer: Answer
}