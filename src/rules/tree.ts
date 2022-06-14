import { TASK, VIEW } from "../utils";

const propRules = ["NC", "ND", "D", "C", "MC", "NMC", "NB", "B", "DN"] as const;
const predRules = [...propRules, "UQ", "NUQ", "EQ", "NEQ", "IS", "NIS"] as const;

const treeRulesOptions = TASK.predicate ? predRules : propRules;

export default treeRulesOptions;