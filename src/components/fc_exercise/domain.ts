export type Assumption = string

export type Premise = string

export type Absurdity = {
    line1?: number
    line2?: number
}

export type RuleLine = {
    formula: string
    line1?: number
    line2?: number
    rule?: "b-intro" | "b-elim" | "i-intro" | "i-elim"
}

export type ProofLine = Subproof | RuleLine

export type SubproofLine = Subproof | RuleLine | Absurdity

export const isSubproof = (line: SubproofLine): line is Subproof => (line as Subproof).assumption != undefined;
export const isRuleLine = (line: ProofLine | SubproofLine): line is RuleLine => (line as RuleLine).formula != undefined;

export interface Subproof {
    assumption: Assumption,
    lines: SubproofLine[]
}

export interface Proof {
    premises: Premise[],
    lines: ProofLine[]
}