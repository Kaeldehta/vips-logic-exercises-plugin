import { For, ParentProps } from "solid-js";
import { FitchRuleType } from "../../../schemas/fitch";
import FormulaRender from "../../FormulaRender";
import fitchProofOptions from "../../../rules/fitch";

const FitchLineRuleCorrect = (props: ParentProps<{ line: FitchRuleType }>) => {
  return (
    <>
      <div class="shrink-0 w-52 min-w-fit h-12 px-2 py-1 flex items-center justify-start">
        <FormulaRender value={props.line.formula} />
      </div>
      {props.children}
      <span class="w-32">
        {
          fitchProofOptions[props.line.rule as keyof typeof fitchProofOptions]
            .label
        }
      </span>
      <For each={props.line.from}>
        {(from) => <span class="w-20">{from + 1}</span>}
      </For>
    </>
  );
};

export default FitchLineRuleCorrect;
