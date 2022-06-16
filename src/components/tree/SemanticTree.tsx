import { Show } from "solid-js";
import useSemanticTreeStoreContext from "../../contexts/tree";
import { semanticTreeSchema } from "../../schemas/solve";
import Submitter from "../Submitter";
import SemanticTreeLine from "./SemanticTreeLine";

const SemanticTree = () => {
  const [store, set] = useSemanticTreeStoreContext();

  const start = () => set([{ type: "ass", formula: "" }]);

  return (
    <>
      <div class="flex flex-col gap-1 justify-start items-center">
        <Show
          when={store.length}
          fallback={
            <button type="button" onClick={start}>
              Start
            </button>
          }
        >
          <SemanticTreeLine index={0} line={store[0]} end={store.length - 1} />
        </Show>
      </div>
      <Submitter values={store} schema={semanticTreeSchema} />
    </>
  );
};

export default SemanticTree;
