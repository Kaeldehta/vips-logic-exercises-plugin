import { z } from "zod";

const propFormulaRegex = /[pqr12345789iklno()]*/;
const predFormulaRegex = /[pqr12345789iklno()abcFGHxyzue=]*/;

const regex = (TASK as { predicate?: boolean } | undefined)?.predicate
  ? predFormulaRegex
  : propFormulaRegex;

export const formula = z.string().regex(regex).default("");

export const from = z.array(z.number().min(-1));
