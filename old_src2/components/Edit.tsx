import { createSignal, Match, Switch } from "solid-js";
import { TASK_TYPE } from "../../src/utils";



const Edit = () => {

  const [type, setType] = createSignal(TASK_TYPE);

  document.forms[0].onsubmit = (e) => {
    e.preventDefault();
  }

  return <Switch fallback={
    <>
      <button class="button" onClick={() => setType("tree")}>
        Semantic Tree
      </button>
      <button class="button" onClick={() => setType("fitch")}>
        Fitch Proof
      </button>
    </>
  }>
    <Match when={type() == "tree"}>
      <input class="h-16 border-red-100 border border-solid" />
    </Match>

    <Match when={type() == "fitch"}>
      Fitch
    </Match>

  </Switch>
}

export default Edit;