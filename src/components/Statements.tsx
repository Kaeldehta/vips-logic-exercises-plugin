import Formula from "./Formula";
import { For } from "solid-js";
import useTaskStoreContext from "../contexts/edit";
import { produce } from "solid-js/store"

const Statements = () => {

  const [store, set] = useTaskStoreContext();

  return <><For each={store.statements}>
    {(statement, index) => <div class="flex items-center">
      <Formula value={statement.statement} setValue={(v) => set("statements", index(), { statement: v })} />
      <button type="button" onClick={() => set(produce(state => {
        state.statements.splice(index(), 1)
      }))}>-</button>
    </div>}
  </For>
    <button type="button" onClick={() => set(produce(state => {
      state.statements.push({ statement: "" })
    }))}>+</button>
  </>

}

export default Statements;