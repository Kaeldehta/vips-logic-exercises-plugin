import { createUniqueId } from "solid-js";
import { z } from "zod";

const propFormulaRegex = /[pqr][1-9]?|[iklno()m]/;
const predFormulaRegex = /[pqrFGHxyzabc][1-9]?|[iklno()mue=]/;

export const id = z.object({ id: z.string().default(() => createUniqueId()) });

export const formulaRegex =
  VIEW === "edit" || (TASK as { predicate?: boolean } | undefined)?.predicate
    ? predFormulaRegex
    : propFormulaRegex;

export const formula = z.array(z.string().regex(formulaRegex)).default([]);

export type FormulaType = z.infer<typeof formula>;

export const from = z.array(z.number().min(-1));
