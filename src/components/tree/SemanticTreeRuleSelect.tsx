import { Index, JSX } from "solid-js";
import useSemanticTreeStoreContext from "../../contexts/tree";
import treeRuleOptions from "../../rules/tree";
import { TreeRuleType } from "../../schemas/solve";

interface SemanticTreeRuleSelectProps {
  rule: TreeRuleType["rule"];
  index: number;
}

const SemanticTreeRuleSelect = (props: SemanticTreeRuleSelectProps) => {
  const [, set] = useSemanticTreeStoreContext();

  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const rule = e.currentTarget.value as TreeRuleType["rule"];
    set(props.index, { rule });
  };

  return (
    <select value={props.rule} onChange={onChange} class="w-28">
      <option hidden></option>
      <Index each={treeRuleOptions}>
        {(value) => <option value={value()}>{value()}</option>}
      </Index>
    </select>
  );
};

export default SemanticTreeRuleSelect;
