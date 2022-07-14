import { Component, lazy, Show } from "solid-js";
import useStoreContext from "../../context";
import { SemanticTreeType } from "../../schemas/tree";
import TreeCounterModel from "./countermodel";
import TreeNode from "./node";

const TreeFallback = lazy(
  () => import(`./fallback.${VIEW}.tsx`) as Promise<{ default: Component }>
);

const Additional = lazy(
  () => import(`./additional.${VIEW}.tsx`) as Promise<{ default: Component }>
);

const Tree = () => {
  const [tree] = useStoreContext<SemanticTreeType>();

  return (
    <>
      <div class="flex flex-col gap-1 justify-start items-center">
        <Show when={!!tree.nodes.length} fallback={<TreeFallback />}>
          <TreeNode
            line={tree.nodes[0]}
            index={0}
            end={tree.nodes.length - 1}
          />
        </Show>
      </div>
      <Additional />
      <TreeCounterModel />
    </>
  );
};

export default Tree;
