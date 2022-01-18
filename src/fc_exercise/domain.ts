import { State } from "@hookstate/core"

export type Assumption = {
    assumption: string
}

export type Premise = {
    premise: string
}

export type Absurdity = {
    from: {
        line1?: number
        line2?: number
    }
}

export type EmptyRuleApplication = {
    formula: string
    rule: undefined
    from: {}
}

export type TwoLineRuleApplication = {
    formula: string
    from: {
        line1?: number
        line2?: number
    }
    rule: "b-intro" | "i-intro" | "i-elim" | "raa" | "c-intro"
}

export type SingleLineRuleApplication = {
    formula: string
    from: {
        line?: number
    }
    rule: "b-elim" | "c-elim" | "d-intro"  | "dn"
}

export type DisjunctionElim = {
    formula: string
    from: {
        line?: number
        assumption1?: number
        assumption2?: number
        line1?: number
        line2?: number
    }
    rule: "d-elim"
}

export type ValidRuleApplication = TwoLineRuleApplication | SingleLineRuleApplication | DisjunctionElim;

export type RuleApplication = ValidRuleApplication | EmptyRuleApplication;

export const isAssumption = (line: Line): line is Assumption => (line as Assumption).assumption !== undefined;
export const isAssumptionState = (state: State<any>): state is State<Assumption> => isAssumption(state.value);

export const isRuleApplication = (line: Line): line is RuleApplication => (line as RuleApplication).formula !== undefined;
export const isRuleApplicationState = (state: State<any>): state is State<RuleApplication> => isRuleApplication(state.value);

export const isPremise = (line: Line): line is Premise => (line as Premise).premise !== undefined;
export const isPremiseState = (state: State<any>): state is State<Premise> => isPremise(state.value);
export const isTwoLineRule = (rule: RuleApplication["rule"]): rule is TwoLineRuleApplication["rule"] => {
    return rule == "b-intro" || rule == "c-intro" || rule == "i-elim" || rule == "i-intro" || rule == "raa";
}
export const isSingleLineRuleApplication = (app: RuleApplication): app is SingleLineRuleApplication => isSingleLineRule(app.rule);
export const isTwoLineRuleApplication = (app: RuleApplication): app is TwoLineRuleApplication => isTwoLineRule(app.rule);
export const isTwoLineRuleState = (state: State<any>): state is State<TwoLineRuleApplication["rule"]> => isTwoLineRule(state.value);
export const isEmptyRule = (rule: RuleApplication["rule"]): rule is EmptyRuleApplication["rule"] => {
    return rule === undefined;
}
export const isEmptyRuleState = (state: State<any>): state is State<EmptyRuleApplication["rule"]> => isEmptyRule(state.value);
export const isSingleLineRule = (rule: RuleApplication["rule"]): rule is SingleLineRuleApplication["rule"] => {
    return rule == "b-elim" || rule == "c-elim" || rule == 'd-intro' || rule == "dn";
}
export const isSingleLineRuleState = (state: State<any>): state is State<SingleLineRuleApplication["rule"]> => isSingleLineRule(state.value);


export type Line = RuleApplication | Absurdity | Assumption | Premise;

export type ProofLine = {
    line: Line
    indentationLevel: number
    id: string
}

export type Response = {
    lines: ProofLine[]
}