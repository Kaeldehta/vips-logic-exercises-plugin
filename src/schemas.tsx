import { z } from "zod";
import { predRules } from "./rules/fitch";

const indentation = z.number().min(0);
const formula = z.string().min(1)
const from = z.array(z.object({ line: z.number().min(0) }))

const abs = z.object({
  type: z.literal("abs"),
  indentation,
  from0: z.number().min(0),
  from1: z.number().min(0)
})

const prem = z.object({
  type: z.literal("prem"),
  indentation: z.literal(0),
  formula
})

const ass = z.object({
  type: z.literal("ass"),
  indentation: indentation.positive(),
  formula
})

const rule = z.object({
  type: z.literal("rule"),
  indentation,
  formula,
  rule: z.enum(predRules),
  from
})

export const fitchProofSchema = z.object({ proof: z.array(z.discriminatedUnion("type", [abs, prem, rule, ass])) })

export type FitchProofType = z.infer<typeof fitchProofSchema>

const fitchProofTask = z.object({
  type: z.literal("fitch"),
  consequence: formula,
  statements: z.array(z.object({ statement: formula }))
})

const semanticTreeTask = z.object({
  type: z.literal("tree"),
  consequence: formula,
  statements: z.array(z.object({ statement: formula }))
})

export const taskSchema = z.discriminatedUnion("type", [semanticTreeTask, fitchProofTask])

export type TaskType = z.infer<typeof taskSchema>