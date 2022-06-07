import { Show } from "solid-js";
import { useSemanticTree } from "../state/tree";
import { Formula as FormulaType, SemanticTreeNode as SemanticTreeNodeType } from "../../src/types";
import Formula from "./Formula";


interface SemanticTreeNodeProps {
  node: SemanticTreeNodeType
  index: number
}

const SemanticTreeNode = (props: SemanticTreeNodeProps) => {

  const [, { setFormula, insertRuleLine }] = useSemanticTree();

  return <div>
    <Show when={props.node.type !== "abs"}>
      <Formula value={(props.node as FormulaType).formula} setValue={newValue => setFormula(props.index, newValue)} allowPred />
    </Show>

    <button type="button" onClick={() => insertRuleLine(props.index)}>+</button>
  </div>
}

export default SemanticTreeNode;