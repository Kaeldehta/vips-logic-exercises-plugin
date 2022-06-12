import useTaskStoreContext from "../contexts/edit";
import { TaskType } from "../schemas/edit";
import FitchProofEdit from "./fitch/FitchProofEdit";
import SemanticTreeEdit from "./tree/SemanticTreeEdit";
import { Switch, Match } from "solid-js"


const Edit = () => {

  const [store, set] = useTaskStoreContext();

  return <div>
    <Switch fallback={<>
      <button type="button" onClick={() => set({ type: "tree", statements: [], consequence: "" })}>Semantic Tree</button>
      <button type="button" onClick={() => set({ type: "fitch", statements: [], consequence: "" })}>Fitch Proof</button>
    </>}>
      <Match when={store.type === "fitch"}>
        <FitchProofEdit />
      </Match>
      <Match when={store.type === "tree"}>
        <SemanticTreeEdit />
      </Match>
    </Switch>
    <input type="hidden" value={JSON.stringify(store)} name="react_form_values" />
  </div>
}

export default Edit;