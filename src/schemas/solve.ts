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
})

const treeRule = z.object({
  formula,
  type: z.literal("rule"),
})

const treeAbs = z.object({
  type: z.literal("abs"),
})

const lines = z.array(z.discriminatedUnion("type", [treeAss, treeRule, treeAbs])).min(1)

interface Tree {
  lines: z.infer<typeof lines>
  branch?: {
    left: Tree
    right: Tree
  }
}

export const semanticTreeSchema: z.ZodType<Tree> = z.lazy(() => z.object({
  lines,
  branch: z.object({
    left: semanticTreeSchema,
    right: semanticTreeSchema
  }).optional(),
}))

export type SemanticTreeType = z.infer<typeof semanticTreeSchema>

