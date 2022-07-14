import { taskSchema, TaskType } from "../schemas/edit";
import FitchProofEdit from "./fitch/FitchProofEdit";
import SemanticTreeEdit from "./tree/SemanticTreeEdit";
import { Switch, Match } from "solid-js";
import Validator from "./Validator";
import useStoreContext from "../context";

const Edit = () => {
  const [store, set] = useStoreContext<TaskType>();

  return (
    <div>
      <Switch
        fallback={
          <div class="flex items-center gap-2">
            <button
              class="bg-gray-300 hover:bg-gray-200 rounded px-1 py-1"
              type="button"
              onClick={() =>
                set({ type: "tree", statements: [], consequence: [] })
              }
            >
              Semantic Tree
            </button>
            <button
              class="bg-gray-300 hover:bg-gray-200 rounded px-1 py-1"
              type="button"
              onClick={() =>
                set({ type: "fitch", statements: [], consequence: [] })
              }
            >
              Fitch Proof
            </button>
          </div>
        }
      >
        <Match when={store.type === "fitch"}>
          <FitchProofEdit />
        </Match>
        <Match when={store.type === "tree"}>
          <SemanticTreeEdit />
        </Match>
      </Switch>
      <input type="hidden" name="task[type]" value={store.type} />
      <Validator values={store} schema={taskSchema} />
    </div>
  );
};

export default Edit;
