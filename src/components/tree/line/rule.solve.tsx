import { Index, JSX } from "solid-js";
import { SemanticTreeType, TreeRuleType } from "../../../schemas/tree";
import treeRuleOptions from "../../../rules/tree";
import TreeFromSelect from "./SemanticTreeFromSelect";
import TreeFormula from "./TreeFormula";
import useStoreContext from "../../../context";

interface TreeLineSolveRuleProps {
  line: TreeRuleType;
  index: number;
}

const TreeLineSolveRule = (props: TreeLineSolveRuleProps) => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const rule = e.currentTarget.value as TreeRuleType["rule"];
    set("nodes", props.index, { rule });
  };

  return (
    <>
      <TreeFormula value={props.line.formula} index={props.index} />
      from
      <TreeFromSelect
        name={`response[nodes][${props.index}][from][0]`}
        value={props.line.from[0]}
        setValue={(from) =>
          set("nodes", props.index, "from" as never, 0, from as never)
        }
      />
      by
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
    </>
  );
};

export default TreeLineSolveRule;
