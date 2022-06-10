import { TASK, VIEW } from "../utils";

export const propRules = ["NC", "ND", "D", "C", "MC", "NMC", "NB", "B", "DN"] as const;
export const predRules = [...propRules, "UQ", "NUQ", "EQ", "NEQ", "IS", "NIS"] as const;
const propRulesOptions = propRules.map(r => ({label: r, value: r, count: 1}))
const predRulesOptions = predRules.map(r => ({label: r, value: r, count: 1}))

const options = TASK.predicate ? predRulesOptions : propRulesOptions

export default options;