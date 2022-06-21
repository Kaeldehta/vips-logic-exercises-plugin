import { For, Index, Match, Switch } from "solid-js";
import fitchRuleOptions from "../../rules/fitch";
import { FitchProofType } from "../../schemas/solve";
import FormulaRender from "../FormulaRender";
import Border, { AssumptionBorder, LastPremiseBorder } from "./Border";

interface FitchProofCorrectProps {
  proof: FitchProofType;
}

const FitchProofCorrect = (props: FitchProofCorrectProps) => {
  return (
    <For each={props.proof}>
      {(line, index) => (
        <div class="h-16 min-w-fit flex justify-start gap-2 items-center">
          <div class="shrink-0 flex items-center w-12">{index() + 1}</div>
          <Index each={Array(line.indentation + 1).fill(0)}>
            {(_, indentationIndex) => (
              <Switch fallback={<Border />}>
                <Match
                  when={
                    line.type === "prem" &&
                    props.proof[index() + 1]?.type !== "prem"
                  }
                >
                  <LastPremiseBorder />
                </Match>
                <Match
                  when={
                    line.type === "ass" && indentationIndex == line.indentation
                  }
                >
                  <AssumptionBorder />
                </Match>
              </Switch>
            )}
          </Index>
          {line.type !== "abs" ? (
            <div class="shrink-0 w-52 min-w-fit h-12 px-2 py-1 flex items-center justify-start">
              <FormulaRender value={line.formula} />
            </div>
          ) : (
            <span class="w-52 ">{"\u22A5"}</span>
          )}
          {line.type === "rule" && (
            <>
              <div class="w-28">
                {
                  fitchRuleOptions[line.rule as keyof typeof fitchRuleOptions]
                    .label
                }
              </div>
              <For each={line.from}>
                {(from) => <div class="w-10">{from + 1}</div>}
              </For>
            </>
          )}
          {line.type === "prem" && <div>Prem.</div>}
          {line.type === "ass" && <div>Ass.</div>}
          {line.type === "abs" && (
            <>
              <div class="w-10">{line.from[0] + 1}</div>
              <div class="w-10">{line.from[1] + 1}</div>
            </>
          )}
        </div>
      )}
    </For>
  );
};

export default FitchProofCorrect;
