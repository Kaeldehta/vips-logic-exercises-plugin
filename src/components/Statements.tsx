import Formula from "./Formula";
import { For } from "solid-js";
import useTaskStoreContext from "../contexts/edit";
import { produce } from "solid-js/store";
import MinusCircle from "./icons/MinusCircle";
import IconButton from "./IconButton";
import PlusCircle from "./icons/PlusCircle";

const Statements = () => {
  const [store, set] = useTaskStoreContext();

  const removeStatement = (index: number) =>
    set(
      produce((state) => {
        state.statements.splice(index, 1);
      })
    );

  const addStatement = () => {
    if (!store.statements) {
      set("statements", [{ statement: [] }]);
    } else {
      set(
        produce((state) => {
          state.statements.push({ statement: [] });
        })
      );
    }
  };

  return (
    <>
      <For each={store.statements}>
        {(statement, index) => (
          <div class="flex items-center">
            <Formula
              name={`task[statements][${index()}][statement]`}
              value={statement.statement}
              setValue={(v) => set("statements", index(), "statement", v)}
            />
            <IconButton show={true} onClick={[removeStatement, index()]}>
              <MinusCircle />
            </IconButton>
          </div>
        )}
      </For>
      <IconButton show={true} onClick={addStatement}>
        <PlusCircle />
      </IconButton>
    </>
  );
};

export default Statements;
