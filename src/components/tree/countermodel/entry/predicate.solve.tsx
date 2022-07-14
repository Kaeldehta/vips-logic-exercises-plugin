import { PredicateModelType, SemanticTreeType } from "../../../../schemas/tree";
import { createMemo, For, Show } from "solid-js";
import { TreeCounterModelEntryProps } from ".";
import IconButton from "../../../IconButton";
import PlusCircle from "../../../icons/PlusCircle";
import { produce } from "solid-js/store";
import Formula from "../../../Formula";
import useStoreContext from "../../../../context";

interface PredicateProps extends TreeCounterModelEntryProps {
  entry: PredicateModelType;
}

const TreeCounterModelPredicateSolve = (props: PredicateProps) => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const arity = createMemo(() => parseInt(props.entry.predicate[0]?.[1]));

  const insert = () =>
    set(
      "countermodel",
      props.index,
      "entries" as never,
      produce<Array<string[]>>((state) => {
        state.push([]);
      })
    );

  return (
    <>
      <Formula
        value={props.entry.predicate}
        name={`response[countermodel][${props.index}][predicate]`}
        setValue={(value) =>
          set("countermodel", props.index, "predicate" as never, value)
        }
        match={/[FGH]/}
        max={1}
      />
      <span>:</span>
      <span>{"{"}</span>
      <Show when={arity()}>
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
                    value
                  )
                }
                match={/[abc]/}
                max={arity()}
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
      </Show>
      <span>{"}"}</span>
    </>
  );
};

export default TreeCounterModelPredicateSolve;
