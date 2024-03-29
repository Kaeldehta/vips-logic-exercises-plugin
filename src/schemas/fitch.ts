import { z } from "zod";
import { fitchRules } from "../rules/fitch";
import { formula, from, id } from "./common";

const indentation = z.number().min(0);

const annotation = z.string().optional();

const fitchPrem = z.object({
  type: z.literal("prem"),
  indentation: z.literal(0),
  formula,
  annotation,
});

export type FitchPremiseType = z.infer<typeof fitchPrem>;

const fitchAss = z.object({
  type: z.literal("ass"),
  indentation: indentation.positive(),
  formula,
  annotation,
});

export type FitchAssumptionType = z.infer<typeof fitchAss>;

const fitchRule = z.object({
  type: z.literal("rule"),
  indentation,
  formula,
  rule: z.enum(fitchRules).or(z.literal("")),
  from: from.default([]),
  annotation,
});

export type FitchRuleType = z.infer<typeof fitchRule>;

const fitchProofSchema = z
  .array(
    z
      .discriminatedUnion("type", [fitchPrem, fitchRule, fitchAss])
      .and(id)
  )
  .default([]);

export default fitchProofSchema;

export type FitchProofType = z.infer<typeof fitchProofSchema>;
