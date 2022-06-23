import { Component, createEffect, lazy, Show } from "solid-js";
import useSemanticTreeStoreContext from "../../contexts/tree";
import TreeNode from "./node";

const TreeFallback = lazy(
  () => import(`./fallback.${VIEW}.tsx`) as Promise<{ default: Component }>
);

const Additional = lazy(
  () => import(`./additional.${VIEW}.tsx`) as Promise<{ default: Component }>
);

const Tree = () => {
  const [tree] = useSemanticTreeStoreContext();

  createEffect(() => {
    console.log(JSON.parse(JSON.stringify(tree)));
  });

  return (
    <>
      <div class="flex flex-col gap-1 justify-start items-center">
        <Show when={!!tree.length} fallback={<TreeFallback />}>
          <TreeNode line={tree[0]} index={0} end={tree.length - 1} />
        </Show>
      </div>
      <Additional />
    </>
  );
};

export default Tree;
