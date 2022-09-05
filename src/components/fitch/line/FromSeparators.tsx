import { FitchRuleType } from "../../../schemas/fitch";
import { Match, Show, Switch } from "solid-js";
import fitchRuleOptions from "../../../rules/fitch";

const FromSeparators = (props: {
  index: number;
  rule: FitchRuleType["rule"];
}) => {
  return (
    <Show
      when={
        props.index <
        fitchRuleOptions[props.rule as keyof typeof fitchRuleOptions].count - 1
      }
    >
      <Switch fallback=", ">
        <Match when={props.rule === "raa" || props.rule === "i-intro"}>
          {" - "}
        </Match>
        <Match when={props.rule === "e-elim" && props.index > 0}>{" - "}</Match>
      </Switch>
    </Show>
  );
};

export default FromSeparators;
