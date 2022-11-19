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

const findDepth = (nodes: SemanticTreeType["nodes"], index: number, end: number): number => {

  if(index === end) return 0;

  const current = nodes[index]

  if(current.right) {
    const left =  findDepth(nodes, index + 1, current.right - 1)
    const right = findDepth(nodes, current.right, end)
    if(left > right) return left + 1;
    return right + 1;
  }

  return findDepth(nodes, index + 1, end);
} 

const Tree = () => {
  const [tree] = useStoreContext<SemanticTreeType>();

  const maxDepth = () => tree.nodes.length > 0 ? findDepth(tree.nodes, 0, tree.nodes.length - 1) : 0
 
  return (
    <>
      <div class="flex flex-col gap-1 justify-start items-center">
        <Show when={!!tree.nodes.length} fallback={<TreeFallback />}>
          <TreeNode
            line={tree.nodes[0]}
            index={0}
            end={tree.nodes.length - 1}
            depth={0}
            maxDepth={maxDepth()}
          />
        </Show>
      </div>
      <Additional />
      <TreeCounterModel />
    </>
  );
};

export default Tree;
