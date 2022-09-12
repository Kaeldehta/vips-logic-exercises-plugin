import { Index, Show } from "solid-js";
import { TreeCounterModelEntryProps } from ".";
import { DomainModelType } from "../../../../schemas/tree";
import FormulaRender from "../../../FormulaRender";

interface DomainProps extends TreeCounterModelEntryProps {
  entry: DomainModelType;
}

const DomainCorrect = (props: DomainProps) => {
  return (
    <div class="flex">
      <FormulaRender value={["D"]} />
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

export default DomainCorrect;
