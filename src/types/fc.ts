
export interface FCProofLine {
    formula?: string
    indentation: number
    rule?: string | null
    from: Array<string | null>
}

export interface FCProof {
    ids: Array<string>
    lines: Record<string, FCProofLine>
}
