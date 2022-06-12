import { z } from "zod";
import { fitchRules } from "../rules/fitch";
import { formula, from } from "../schemas/common";

const indentation = z.number().min(0);

const fitchAbs = z.object({
  type: z.literal("abs"),
  indentation,
  from0: z.number().min(0),
  from1: z.number().min(0)
})

export type FitchAbsurdityType = z.infer<typeof fitchAbs>

const fitchPrem = z.object({
  type: z.literal("prem"),
  indentation: z.literal(0),
  formula
})

export type FitchPremiseType = z.infer<typeof fitchPrem>

const fitchAss = z.object({
  type: z.literal("ass"),
  indentation: indentation.positive(),
  formula
})

export type FitchAssumptionType = z.infer<typeof fitchAss>

const fitchRule = z.object({
  type: z.literal("rule"),
  indentation,
  formula,
  rule: z.enum(fitchRules),
  from
})

export type FitchRuleType = z.infer<typeof fitchRule>

export const fitchProofSchema = z.array(z.discriminatedUnion("type", [fitchAbs, fitchPrem, fitchRule, fitchAss])).min(1);

export type FitchProofType = z.infer<typeof fitchProofSchema>

const treeAss = z.object({
  formula,
  type: z.literal("ass"),
  right: z.number().optional()
})

const treeRule = z.object({
  formula,
  type: z.literal("rule"),
  right: z.number().optional()
})

const treeAbs = z.object({
  type: z.literal("abs"),
  right: z.number().optional()
})

export const semanticTreeSchema = z.array(z.discriminatedUnion("type", [treeAss, treeRule, treeAbs])).min(1)

export type SemanticTreeType = z.infer<typeof semanticTreeSchema>

