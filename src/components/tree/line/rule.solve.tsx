import { Index, JSX } from "solid-js";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import { TreeRuleType } from "../../../schemas/solve";
import treeRuleOptions from "../../../rules/tree";
import Formula from "../../Formula";
import TreeFromSelect from "./SemanticTreeFromSelect";

interface TreeLineSolveRuleProps {
  line: TreeRuleType;
  index: number;
}

const TreeLineSolveRule = (props: TreeLineSolveRuleProps) => {
  const [, set] = useSemanticTreeStoreContext();

  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const rule = e.currentTarget.value as TreeRuleType["rule"];
    set(props.index, { rule });
  };

  return (
    <>
      <Formula
        name={`response[${props.index}][formula]`}
        value={props.line.formula}
        setValue={(v) => set(props.index, "formula" as never, v as never)}
      />
      <select
        name={`response[${props.index}][rule]`}
        value={props.line.rule}
        onChange={onChange}
        class="w-28"
      >
        <option hidden></option>
        <Index each={treeRuleOptions}>
          {(value) => <option value={value()}>{value()}</option>}
        </Index>
      </select>
      <TreeFromSelect
        name={`response[${props.index}][from][0]`}
        value={props.line.from[0]}
        setValue={(from) => set(props.index, "from" as never, 0, from as never)}
      />
    </>
  );
};

export default TreeLineSolveRule;
