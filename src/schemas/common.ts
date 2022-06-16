import { z } from "zod";
import { TaskType } from "./edit";

const propFormulaRegex = /[pqr12345789iklno()]*/;
const predFormulaRegex = /[pqr12345789iklno()abcFGHxyzue=]*/;

export const formula = z
  .string()
  .min(1)
  .regex(
    (TASK as TaskType | undefined)?.predicate
      ? predFormulaRegex
      : propFormulaRegex
  );
export const from = z.array(z.number().min(0));
