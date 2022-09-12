import { Show } from "solid-js";
import { produce } from "solid-js/store";
import useStoreContext from "../../../context";
import { TreeTask } from "../../../schemas/edit";
import { CounterModelEntryType, SemanticTreeType } from "../../../schemas/tree";
import TextButton from "../../TextButton";

const TreeCounterModelAdditionalSolve = () => {
  const [tree, set] = useStoreContext<SemanticTreeType>();

  const removeCounterModel = () => set("countermodel", undefined);

  const addModelEntry = (entry: CounterModelEntryType) =>
    set(
      "countermodel",
      produce((state) => {
        state?.push(entry);
      })
    );

  const addPredicateEntry = () =>
    addModelEntry({
      type: "predicate",
      entries: [],
      predicate: [],
    });

  const addDomain = () => addModelEntry({ type: "domain", entries: [] });

  const addPropositionalEntry = () =>
    addModelEntry({ type: "propositional", value: "false", constant: [] });

  return (
    <div class="flex gap-2 justify-start">
      <Show when={(TASK as TreeTask).predicate}>
        <Show when={!tree.countermodel?.some(({ type }) => type === "domain")}>
          <TextButton onClick={addDomain}>Domain</TextButton>
        </Show>
        <TextButton onClick={addPredicateEntry}>Predicate</TextButton>
      </Show>
      <TextButton onClick={addPropositionalEntry}>
        Propositional constant
      </TextButton>
      <TextButton onClick={removeCounterModel}>Remove counter model</TextButton>
    </div>
  );
};

export default TreeCounterModelAdditionalSolve;
