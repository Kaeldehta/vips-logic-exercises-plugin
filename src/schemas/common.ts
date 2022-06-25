import { z } from "zod";

const propFormulaRegex = /[pqr][1-9]?|[iklno()]/;
const predFormulaRegex = /[pqrFGHxyzabc][1-9]?|[iklno()ue=]/;

const regex =
  VIEW === "edit" || (TASK as { predicate?: boolean } | undefined)?.predicate
    ? predFormulaRegex
    : propFormulaRegex;

export const formula = z.array(z.string().regex(regex)).default([]);

export type FormulaType = z.infer<typeof formula>;

export const from = z.array(z.number().min(-1));
