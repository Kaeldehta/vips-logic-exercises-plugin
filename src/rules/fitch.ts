import { FitchProofTask } from "../schemas/edit";

const propRules = [
  "b-intro",
  "i-intro",
  "i-elim",
  "raa",
  "c-intro",
  "b-elim",
  "c-elim",
  "d-intro",
  "dn",
  "d-elim",
] as const;
const predRules = [
  ...propRules,
  "u-elim",
  "u-intro",
  "e-intro",
  "e-elim",
  "id-intro",
  "id-elim",
] as const;

export const fitchRules = (TASK as FitchProofTask).predicate
  ? predRules
  : propRules;

const propRulesOptions: Record<
  typeof propRules[number],
  { label: string; count: number }
> = {
  "i-intro": {
    label: "\u2192-Intro",
    count: 2,
  },
  "i-elim": {
    label: "\u2192-Elim",
    count: 2,
  },
  "b-intro": {
    label: "\u2194-Intro",
    count: 2,
  },
  "b-elim": {
    label: "\u2194-Elim",
    count: 2,
  },
  "c-intro": {
    label: "\u2227-Intro",
    count: 2,
  },
  "c-elim": {
    label: "\u2227-Elim",
    count: 1,
  },
  "d-intro": {
    label: "\u2228-Intro",
    count: 1,
  },
  "d-elim": {
    label: "\u2228-Elim",
    count: 5,
  },
  raa: {
    label: "RAA",
    count: 2,
  },
  dn: {
    label: "DN",
    count: 1,
  },
};

const predRulesOptions: Record<
  typeof predRules[number],
  { label: string; count: number }
> = {
  ...propRulesOptions,
  "u-intro": {
    label: "\u2200-Intro",
    count: 1,
  },
  "u-elim": {
    label: "\u2200-Elim",
    count: 1,
  },
  "e-intro": {
    label: "\u2203-Intro",
    count: 1,
  },
  "e-elim": {
    label: "\u2203-Elim",
    count: 3,
  },
  "id-intro": {
    label: "=-Intro",
    count: 0,
  },
  "id-elim": {
    label: "=-Elim",
    count: 2,
  },
};

const fitchRuleOptions = (TASK as FitchProofTask).predicate
  ? predRulesOptions
  : propRulesOptions;

export default fitchRuleOptions;
