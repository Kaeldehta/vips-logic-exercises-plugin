import taskSchema, { TaskType } from "../schemas/edit";
import FitchProofEdit from "./fitch/FitchProofEdit";
import SemanticTreeEdit from "./tree/SemanticTreeEdit";
import { Switch, Match } from "solid-js";
import Validator from "./Validator";
import useStoreContext from "../context";
import TextButton from "./TextButton";

const Edit = () => {
  const [store, set] = useStoreContext<TaskType>();

  return (
    <div>
      <Switch
        fallback={
          <div class="flex items-center gap-2">
            <TextButton
              onClick={() =>
                set({ type: "tree", statements: [], consequence: [] })
              }
            >
              Semantic Tree
            </TextButton>
            <TextButton
              onClick={() =>
                set({ type: "fitch", statements: [], consequence: [] })
              }
            >
              Fitch Proof
            </TextButton>
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
