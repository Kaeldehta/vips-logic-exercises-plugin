export type Assumption = {
    formula: string
    indentationLevel: number
    from: {
        rule: "ass"
    }
}

export type Premise = {
    indentationLevel: number,
    from: {
        rule: "prem"
    }
    formula: string
}

export type Absurdity = {
    indentationLevel: number
    from: {
        rule: "abs"
        line1?: number,
        line2?: number
    }
}

export type Rule = ConditionalElim | ConditionalIntro | BiconditionalElim | BiconditionalIntro

export type ConditionalIntro = {
    rule?: "i-intro"
    line1?: number
    line2?: number
}

export type ConditionalElim = {
    rule?: "i-elim"
    line1?: number
    line2?: number
}

export type BiconditionalIntro = {
    rule?: "b-intro"
    line1?: number
    line2?: number
}

export type BiconditionalElim = {
    rule?: "b-elim"
    line1?: number
    line2?: number
}

export type RuleApplication = {
    formula: string
    indentationLevel: number
    from: Rule
}

export type LineWithFormula = RuleApplication | Assumption | Premise;

export type Line = Absurdity | LineWithFormula;

export const hasFormula = (line: Line): line is LineWithFormula => (line as LineWithFormula).formula != undefined;
export const isAbsurdity = (line: Line): line is Absurdity => (line as Absurdity).from && (line as Absurdity).from.rule == "abs";
export const isAssumption = (line: Line): line is Assumption => (line as Assumption).from && (line as Assumption).from.rule == "ass";
export const isPremise = (line: Line): line is Premise => (line as Premise).from && (line as Premise).from.rule == "prem";