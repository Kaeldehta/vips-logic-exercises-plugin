import { State } from "@hookstate/core"

export type Assumption = {
    assumption: string
}

export type Premise = {
    premise: string
}

export type Absurdity = {
    line1?: number
    line2?: number
}

export type RuleApplication = {
    formula: string
    line1?: number
    line2?: number
    rule?: "b-intro" | "b-elim" | "i-intro" | "i-elim"
}

export const isAssumption = (line: Line): line is Assumption => (line as Assumption).assumption !== undefined;
export const isAssumptionState = (state: State<any>): state is State<Assumption> => isAssumption(state.value);

export const isRuleApplication = (line: Line): line is RuleApplication => (line as RuleApplication).formula !== undefined;
export const isRuleApplicationState = (state: State<any>): state is State<RuleApplication> => isRuleApplication(state.value);

export const isPremise = (line: Line): line is Premise => (line as Premise).premise !== undefined;
export const isPremiseState = (state: State<any>): state is State<Premise> => isPremise(state.value);

export type Line = RuleApplication | Absurdity | Assumption | Premise;

export type ProofLine = {
    line: Line
    indentationLevel: number
    id: string
}