import { z } from "zod";
import { formula } from "./common";

const predicate = z.boolean().optional();

const statements = z.array(z.object({ statement: formula })).default([]);

export const emptyTask = z.object({
  type: z.literal("empty"),
});

export const fitchProofTask = z.object({
  type: z.literal("fitch"),
  consequence: formula,
  statements,
  predicate,
});

export type FitchProofTask = z.infer<typeof fitchProofTask>;

export const semanticTreeTask = z.object({
  type: z.literal("tree"),
  consequence: formula,
  statements,
  predicate,
});

export type TreeTask = z.infer<typeof semanticTreeTask>;

const taskSchema = z
  .discriminatedUnion("type", [semanticTreeTask, fitchProofTask, emptyTask])
  .default({ type: "empty" });

export default taskSchema;

export type TaskType = z.infer<typeof taskSchema>;
