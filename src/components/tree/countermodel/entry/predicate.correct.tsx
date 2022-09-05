import { Index, Show } from "solid-js";
import { TreeCounterModelEntryProps } from ".";
import { PredicateModelType } from "../../../../schemas/tree";
import FormulaRender from "../../../FormulaRender";

interface PredicateProps extends TreeCounterModelEntryProps {
  entry: PredicateModelType;
}

const PredicateCorrect = (props: PredicateProps) => {
  return (
    <div class="flex">
      <FormulaRender value={props.entry.predicate} />
      {": "}
      {"{"}
      <Index each={props.entry.entries}>
        {(entry, index) => (
          <>
            <FormulaRender value={entry()} />
            <Show when={index < props.entry.entries.length - 1}>{","}</Show>
          </>
        )}
      </Index>
      {" }"}
    </div>
  );
};

export default PredicateCorrect;
