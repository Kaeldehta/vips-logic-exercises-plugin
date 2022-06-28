import { Component, For, lazy, Show } from "solid-js";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import TreeCounterModelEntry from "./entry";

const Fallback = lazy(
  () => import(`./fallback.${VIEW}.tsx`) as Promise<{ default: Component }>
);

const Additional = lazy(
  () => import(`./additional.${VIEW}.tsx`) as Promise<{ default: Component }>
);

const TreeCounterModel = () => {
  const [tree] = useSemanticTreeStoreContext();

  return (
    <div class="mt-20">
      <Show when={tree.countermodel !== undefined} fallback={<Fallback />}>
        <div class="flex flex-col gap-2">
          <span>Countermodel:</span>
          <For each={tree.countermodel}>
            {(entry, index) => (
              <TreeCounterModelEntry entry={entry} index={index()} />
            )}
          </For>
          <Additional />
        </div>
      </Show>
    </div>
  );
};

export default TreeCounterModel;
