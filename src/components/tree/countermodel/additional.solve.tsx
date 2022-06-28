import { Show } from "solid-js";
import { produce } from "solid-js/store";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import { TaskType } from "../../../schemas/edit";
import { CounterModelEntryType } from "../../../schemas/solve";

const TreeCounterModelAdditionalSolve = () => {
  const [, set] = useSemanticTreeStoreContext();

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
      <Show when={(TASK as TaskType | undefined)?.predicate}>
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
