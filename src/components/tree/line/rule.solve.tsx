import { Index, JSX } from "solid-js";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import { TreeRuleType } from "../../../schemas/solve";
import treeRuleOptions from "../../../rules/tree";
import TreeFromSelect from "./SemanticTreeFromSelect";
import TreeFormula from "./TreeFormula";

interface TreeLineSolveRuleProps {
  line: TreeRuleType;
  index: number;
}

const TreeLineSolveRule = (props: TreeLineSolveRuleProps) => {
  const [, set] = useSemanticTreeStoreContext();

  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const rule = e.currentTarget.value as TreeRuleType["rule"];
    set("nodes", props.index, { rule });
  };

  return (
    <>
      <TreeFormula value={props.line.formula} index={props.index} />
      <select
        name={`response[nodes][${props.index}][rule]`}
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
        name={`response[nodes][${props.index}][from][0]`}
        value={props.line.from[0]}
        setValue={(from) =>
          set("nodes", props.index, "from" as never, 0, from as never)
        }
      />
    </>
  );
};

export default TreeLineSolveRule;
