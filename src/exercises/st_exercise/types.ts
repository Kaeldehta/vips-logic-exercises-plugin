export const propRules = ["NC", "ND", "D", "C", "MC", "NMC", "NB", "B", "DN", "F"] as const;
export const predRules = [...propRules, "UQ", "NUQ", "EQ", "NEQ", "IS", "NIS"] as const;
export const propRulesOptions = propRules.map(r => ({label: r, value: r, count: 1}))
export const predRulesOptions = predRules.map(r => ({label: r, value: r, count: 1}))