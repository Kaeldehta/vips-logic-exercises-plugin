import { DomainModelType, SemanticTreeType } from "../../../../schemas/tree";
import { For, Show } from "solid-js";
import { TreeCounterModelEntryProps } from ".";
import IconButton from "../../../IconButton";
import PlusCircle from "../../../icons/PlusCircle";
import { produce } from "solid-js/store";
import Formula from "../../../Formula";
import useStoreContext from "../../../../context";

interface DomainProps extends TreeCounterModelEntryProps {
  entry: DomainModelType;
}

const TreeCounterModelDomainSolve = (props: DomainProps) => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const insert = () =>
    set(
      "countermodel",
      props.index,
      "entries" as never,
      produce<Array<string[]>>((state) => {
        state.push([]);
      }) as never
    );

  return (
    <>
      <div class="w-12 px-2 h-12 flex items-center">D</div>
      <span>:</span>
      <span>{"{"}</span>
      <For each={props.entry.entries}>
        {(entry, index) => (
          <>
            <Formula
              value={entry}
              name={`response[countermodel][${
                props.index
              }][entries][${index()}]`}
              setValue={(value) =>
                set(
                  "countermodel",
                  props.index,
                  "entries" as never,
                  index(),
                  value as never
                )
              }
              match={/[abc]/}
              max={1}
            />
            <Show when={index() < props.entry.entries.length - 1}>
              <span>,</span>
            </Show>
          </>
        )}
      </For>
      <IconButton onClick={insert} show>
        <PlusCircle />
      </IconButton>
      <span>{"}"}</span>
    </>
  );
};

export default TreeCounterModelDomainSolve;
