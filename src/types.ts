export type SemanticTree = Array<SemanticTreeNode>;

export interface SemanticTreeNode {
  id: string;
  formula?: string;
}

export type FitchProof = Array<FitchProofLine>;

interface Indentation {
  indentation: number;
}

interface From {
  from: Array<number>;
}

interface Formula {
  formula: string;
}

interface Assumption extends Indentation, Formula {
  type: "ass";
}

interface Premise extends Indentation, Formula {
  type: "prem";
  indentation: 0;
}

interface RuleLine extends Indentation, Formula, From {
  type: "rule";
  rule: string | null;
}

interface Absurdity extends Indentation, From {
  type: "abs";
}

export interface FitchProofLine {
  type: "ass" | "rule" | "prem" | "abs";
  indentation: number;
  formula?: string;
  from: Array<number>;
  rule?: string | null;
}
