import { z } from "zod"
import { formula } from "./common"

const fitchProofTask = z.object({
  type: z.literal("fitch"),
  consequence: formula,
  statements: z.array(z.object({ statement: formula }))
})

export type FitchProofTask = z.infer<typeof fitchProofTask>

const semanticTreeTask = z.object({
  type: z.literal("tree"),
  consequence: formula,
  statements: z.array(z.object({ statement: formula }))
})

export const taskSchema = z.discriminatedUnion("type", [semanticTreeTask, fitchProofTask])

export type TaskType = z.infer<typeof taskSchema>