import { batch, createEffect } from "solid-js";
import { createMutable, reconcile } from "solid-js/store";
import useStoreContext from "../context";
import TextButton from "./TextButton";

const UndoHandler = () => {
  const [store, set] = useStoreContext<object>();

  const history = createMutable<string[]>([]);

  const disableUndo = () => history.length === 0;

  createEffect<[string, number]>((arg) => {
    const parsed = JSON.stringify(store);
    const historyLength = history.length;

    if (arg) {
      const [oldState, oldHistoryLength] = arg;
      if (oldHistoryLength === historyLength && oldState !== parsed) {
        history.push(oldState);
      }
    }

    return [parsed, historyLength];
  });

  return (
    <div
      onKeyPress={(e) => {
        console.log(e);
      }}
    >
      <TextButton
        disabled={disableUndo()}
        onClick={() =>
          batch(() => {
            const last = history.pop();
            if (last) {
              set(reconcile(JSON.parse(last)));
            }
          })
        }
      >
        Undo
      </TextButton>
    </div>
  );
};

export default UndoHandler;
