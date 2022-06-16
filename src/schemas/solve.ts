import { z } from "zod";
import { fitchRules } from "../rules/fitch";
import treeRulesOptions from "../rules/tree";
import { formula, from } from "../schemas/common";

const indentation = z.number().min(0);

const annotation = z.string().optional();

const fitchAbs = z.object({
  type: z.literal("abs"),
  indentation,
  from: from.length(2),
  annotation,
});

export type FitchAbsurdityType = z.infer<typeof fitchAbs>;

const fitchPrem = z.object({
  type: z.literal("prem"),
  indentation: z.literal(0),
  formula,
  annotation,
});

export type FitchPremiseType = z.infer<typeof fitchPrem>;

const fitchAss = z.object({
  type: z.literal("ass"),
  indentation: indentation.positive(),
  formula,
  annotation,
});

export type FitchAssumptionType = z.infer<typeof fitchAss>;

const fitchRule = z.object({
  type: z.literal("rule"),
  indentation,
  formula,
  rule: z.enum(fitchRules),
  from,
  annotation,
});

export type FitchRuleType = z.infer<typeof fitchRule>;

export const fitchProofSchema = z
  .array(
    z.discriminatedUnion("type", [fitchAbs, fitchPrem, fitchRule, fitchAss])
  )
  .min(1);

export type FitchProofType = z.infer<typeof fitchProofSchema>;

const right = z.number().optional();

const treeAss = z.object({
  formula,
  type: z.literal("ass"),
  right,
});

export type TreeAssumptionType = z.infer<typeof treeAss>;

const treeRule = z.object({
  formula,
  type: z.literal("rule"),
  right,
  rule: z.enum(treeRulesOptions),
  from: from.length(1),
});

export type TreeRuleType = z.infer<typeof treeRule>;

const treeAbs = z.object({
  type: z.literal("abs"),
  right,
  from: from.length(2),
});

export type TreeAbsurdityType = z.infer<typeof treeAbs>;

export const semanticTreeSchema = z
  .array(z.discriminatedUnion("type", [treeAss, treeRule, treeAbs]))
  .min(1);

export type SemanticTreeType = z.infer<typeof semanticTreeSchema>;
