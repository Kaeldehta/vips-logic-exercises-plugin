import { FitchProofType, FitchRuleType } from "../../../schemas/fitch";
import { Index, JSX, ParentProps, Show } from "solid-js";
import fitchRuleOptions from "../../../rules/fitch";
import FitchProofFromSelect from "../FitchProofFromSelect";
import FitchFormula from "./FitchFormula";
import useStoreContext from "../../../context";
import FromSeparators from "./FromSeparators";

const FitchLineRuleSolve = (
  props: ParentProps<{ line: FitchRuleType; index: number }>
) => {
  const [, set] = useStoreContext<FitchProofType>();

  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const rule = e.currentTarget.value as keyof typeof fitchRuleOptions;
    set(props.index, {
      rule,
      from: Array(fitchRuleOptions[rule].count).fill(-1),
    });
  };

  return (
    <>
      <FitchFormula value={props.line.formula} index={props.index} />
      {props.children}
      <select
        name={`response[${props.index}][rule]`}
        value={props.line.rule}
        onChange={onChange}
        class="w-32"
      >
        <option hidden></option>
        <Index each={Object.entries(fitchRuleOptions)}>
          {(value) => <option value={value()[0]}>{value()[1].label}</option>}
        </Index>
      </select>
      <Show when={props.line.rule && props.line.from.length > 0}>{","}</Show>
      <Index each={props.line.from}>
        {(from, index) => (
          <>
            <FitchProofFromSelect
              name={`response[${props.index}][from][${index}]`}
              index={props.index}
              value={from()}
              setValue={(v) =>
                set(props.index, "from" as never, index, v as never)
              }
            />
            <FromSeparators index={index} rule={props.line.rule} />
          </>
        )}
      </Index>
    </>
  );
};

export default FitchLineRuleSolve;
