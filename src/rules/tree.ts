import { TreeTask } from "../schemas/edit";

const propRules = ["NC", "ND", "D", "C", "MC", "NMC", "NB", "B", "DN"] as const;
const predRules = [
  ...propRules,
  "UQ",
  "NUQ",
  "EQ",
  "NEQ",
  "IS",
  "NIS",
] as const;

const treeRulesOptions = (TASK as TreeTask).predicate ? predRules : propRules;

export default treeRulesOptions;
