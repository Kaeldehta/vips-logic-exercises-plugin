export interface RuleApplication {
    id: string,
    rule: string
}

export interface Row {
    formula: string,
    from?: RuleApplication
}