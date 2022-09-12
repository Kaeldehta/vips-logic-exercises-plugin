import { z } from "zod";
import treeRulesOptions from "../rules/tree";
import { formula, from, id } from "./common";

const right = z.number().optional();

const treeAss = z.object({
  formula,
  type: z.literal("ass"),
  right,
});

export type TreeAssumptionType = z.infer<typeof treeAss>;

const treeRule = z.object({
  formula,
  type: z.literal("rule"),
  right,
  rule: z.enum(treeRulesOptions).or(z.literal("")),
  from: from.length(1),
});

export type TreeRuleType = z.infer<typeof treeRule>;

const treeAbs = z.object({
  type: z.literal("abs"),
  right,
  from: from.length(2),
});

export type TreeAbsurdityType = z.infer<typeof treeAbs>;

const propositionalModel = z.object({
  constant: z.array(z.string().regex(/[pqr][1-9]?/)).length(1),
  value: z.enum(["true", "false"]),
  type: z.literal("propositional"),
});

export type PropositionalModelType = z.infer<typeof propositionalModel>;

const predicateModel = z.object({
  predicate: z.array(z.string().regex(/[FGH][1-9][1-9]?/)).length(1),
  entries: z.array(z.array(z.string().regex(/[abc][1-9]?/))).default([]),
  type: z.literal("predicate"),
});

export type PredicateModelType = z.infer<typeof predicateModel>;

const domainModel = z.object({
  type: z.literal("domain"),
  entries: z.array(z.array(z.string().regex(/[abc][1-9]?/))).default([]),
});

export type DomainModelType = z.infer<typeof domainModel>;

const counterModelType = (TASK as { predicate?: boolean } | undefined)
  ?.predicate
  ? z.discriminatedUnion("type", [
      propositionalModel,
      predicateModel,
      domainModel,
    ])
  : propositionalModel;

export type CounterModelEntryType = z.infer<typeof counterModelType>;

const semanticTreeSchema = z
  .object({
    nodes: z
      .array(z.discriminatedUnion("type", [treeAss, treeRule, treeAbs]).and(id))
      .default([]),
    countermodel: z.array(counterModelType).optional(),
  })
  .default({ nodes: [] });

export default semanticTreeSchema;

export type SemanticTreeType = z.infer<typeof semanticTreeSchema>;
