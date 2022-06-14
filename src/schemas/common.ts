import { z } from "zod";
import { TASK } from "../utils";

const propFormulaRegex = /[pqr12345789iklno()]*/;
const predFormulaRegex = /[pqr12345789iklno()abcFGHxyzue=]*/;

export const formula = z
  .string()
  .min(1)
  .regex(TASK ? predFormulaRegex : propFormulaRegex);
export const from = z.array(z.number().min(0));
