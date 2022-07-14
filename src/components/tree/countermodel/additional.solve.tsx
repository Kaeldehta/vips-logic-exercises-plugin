import { Show } from "solid-js";
import { produce } from "solid-js/store";
import useStoreContext from "../../../context";
import { TreeTask } from "../../../schemas/edit";
import { CounterModelEntryType, SemanticTreeType } from "../../../schemas/tree";

const TreeCounterModelAdditionalSolve = () => {
  const [, set] = useStoreContext<SemanticTreeType>();

  const removeCounterModel = () => set("countermodel", undefined);

  const addModelEntry = (entry: CounterModelEntryType) =>
    set(
      "countermodel",
      produce((state) => {
        state?.push(entry);
      })
    );

  const addPredicatEntry = () =>
    addModelEntry({ type: "predicate", entries: [], predicate: [] });

  const addPropositionalEntry = () =>
    addModelEntry({ type: "propositional", value: "false", constant: [] });

  return (
    <div class="flex gap-2 justify-start">
      <Show when={(TASK as TreeTask).predicate}>
        <button
          onClick={addPredicatEntry}
          type="button"
          class="bg-gray-100 rounded px-1 py-1 border-black border hover:bg-gray-200"
        >
          Predicate
        </button>
      </Show>
      <button
        onClick={addPropositionalEntry}
        type="button"
        class="bg-gray-100 rounded px-1 py-1 border-black border hover:bg-gray-200"
      >
        Propositional constant
      </button>
      <button
        onClick={removeCounterModel}
        type="button"
        class="bg-gray-100 rounded px-1 py-1 border-black border hover:bg-gray-200"
      >
        Remove counter model
      </button>
    </div>
  );
};

export default TreeCounterModelAdditionalSolve;
