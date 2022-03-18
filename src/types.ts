export type LineId = string

export interface FitchCalculusProofLine {
    formula?: string
    indentation: number
    rule?: string | null
    children: []
    from: Array<LineId | null>
}

export interface SemanticTreeLine {
    formula?: string
    rule?: string | null
    children: [LineId] | [LineId, LineId] | []
    from: Array<LineId | null>
}

export type Line = SemanticTreeLine | FitchCalculusProofLine

export interface LogicTask {
    consequence: string,
    statements: {
        ids: Array<string>
        entries: Record<string, string>
    },
    predicateLogic: boolean
}

export type FitchCalculusTask = {
    type: "fitch_calculus"
} & LogicTask

export type SemanticTreeTask = {
    type: "semantic_tree"
} & LogicTask

export type Task = SemanticTreeTask | FitchCalculusTask;

export interface FitchCalculusProof {
    lines: Record<LineId, FitchCalculusProofLine>
    ids: Array<LineId>
}

export interface SemanticTree {
    lines: Record<LineId, SemanticTreeLine>
    ids: Array<LineId>
    root: LineId | null
}

export type Solution = FitchCalculusProof | SemanticTree

export interface SolveView {
    view: "solve"
    task: Task,
    solution?: Solution
}

export interface CorrectView {
    view: "correct",
    task: Task,
    solution?: Solution,
}

export interface EditView {
    view: "edit",
    task?: Task
}

export type EditDataset = EditView & {
    task?: string
}

export interface SolveDataset {
    task: string
    solution?: string
}

export interface CorrectDataset {
    view: "correct"
    task?: string,
    solution?: string,
}

export type View = CorrectView | EditView | SolveView;

export type Dataset = {
    view: "correct" | "solve" | "edit"
    task?: string,
    solution?: string,
}