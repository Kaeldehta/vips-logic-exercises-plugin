import { For, ParentProps, Show } from "solid-js";
import { FitchRuleType } from "../../../schemas/fitch";
import FormulaRender from "../../FormulaRender";
import fitchProofOptions from "../../../rules/fitch";
import FromSeparators from "./FromSeparators";

const FitchLineRuleCorrect = (props: ParentProps<{ line: FitchRuleType }>) => {
  return (
    <>
      <div class="shrink-0 w-52 min-w-fit h-12 px-2 py-1 flex items-center justify-start">
        <FormulaRender value={props.line.formula} />
      </div>
      {props.children}
      <span>
        <Show when={props.line.rule !== ""}>
          {
            fitchProofOptions[props.line.rule as keyof typeof fitchProofOptions]
              .label
          }
          {", "}
        </Show>
        <For each={props.line.from}>
          {(from, index) => (
            <>
              {"("}
              {from + 1}
              {")"}
              <FromSeparators index={index()} rule={props.line.rule} />
            </>
          )}
        </For>
      </span>
    </>
  );
};

export default FitchLineRuleCorrect;
