export type SemanticTree = Array<SemanticTreeNode | undefined>

export type FitchProof = Array<FitchProofLine>

interface Indentation {
  readonly indentation: number
}

interface Children {
  children: [] | [number] | [number, number]
}

export interface From {
  from: Array<number>
}

export interface Formula {
  formula: string
}

interface Assumption extends Formula {
  readonly type: "ass"
}

interface Premise extends Formula {
  readonly type: "prem"
}

interface RuleLine<T = string> extends Formula, From {
  readonly type: "rule"
  rule: T | null
}

interface Absurdity extends From {
  readonly type: "abs",
}

export type FitchProofLine = (Absurdity | RuleLine | (Premise & {indentation: 0}) | Assumption) & Indentation
export type SemanticTreeNode = (Assumption | RuleLine | Absurdity)
// export type SemanticTreeNode = ChildlessSemanticTreeNode & Children
