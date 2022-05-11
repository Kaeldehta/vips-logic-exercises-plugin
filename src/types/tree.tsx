
export interface TreeSolutionLine {
    formula?: string
    rule?: string | null
    from: Array<string | null>
    children: Array<string>
}

export interface TreeSolution {
    ids: Array<string>
    lines: Record<string, TreeSolutionLine>
    root: string | null
}