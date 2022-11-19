/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Index, lazy, ParentComponent, Show } from "solid-js";
import useStoreContext from "../../../context";
import { SemanticTreeType } from "../../../schemas/tree";
import TreeLine from "../line";

export interface TreeNodeProps {
  line: SemanticTreeType["nodes"][number];
  index: number;
  end: number;
  depth: number;
  maxDepth: number;
}

const TreeLineWrapper = lazy(
  () =>
    import(`./wrapper.${VIEW}.tsx`) as Promise<{
      default: ParentComponent<TreeNodeProps>;
    }>
);

const TreeNode = (props: TreeNodeProps) => {
  const [tree] = useStoreContext<SemanticTreeType>();

  return (
    <>
      <TreeLineWrapper {...props}>
        <TreeLine {...props} />
      </TreeLineWrapper>
      <Show when={props.line.type !== "abs"}>
        <Show
          when={props.line.right}
          fallback={
            <Show when={props.index !== props.end} fallback={
              <div class="flex gap-8">
                <Index each={Array((props.maxDepth - props.depth) * 2).fill(0)}>
                  {() => <div class="m-1 h-px w-[35rem]"/>}
                </Index>
              
              </div>
            }>
              <TreeNode
                depth={props.depth}
                maxDepth={props.maxDepth}
                index={props.index + 1}
                line={tree.nodes[props.index + 1]}
                end={props.end}
              />
            </Show>
          }
        >
          <div class="flex gap-8">
            <div class="flex flex-col gap-1 justify-start items-center">
              <div class="self-stretch h-10">
                  <svg class="h-full w-full">
                    <line x1="50%" x2="90%" y1="90%" y2="10%" stroke="rgb(0,0,0)" stroke-width={2}>

                    </line>
                  </svg>
              </div>
              <TreeNode
                index={props.index + 1}
                line={tree.nodes[props.index + 1]}
                end={props.line.right! - 1}
                depth={props.depth + 1}
                maxDepth={props.maxDepth}
              />
            </div>
            <div class="flex flex-col gap-1 justify-start items-center">
              <div class="self-stretch h-10">
                  <svg class="h-full w-full">
                    <line x1="10%" x2="50%" y1="10%" y2="90%" stroke="rgb(0,0,0)" stroke-width={2}>

                    </line>
                  </svg>
              </div>
              <TreeNode
                index={props.line.right!}
                line={tree.nodes[props.line.right!]}
                end={props.end}
                maxDepth={props.maxDepth}
                depth={props.depth + 1}
              />
            </div>
          </div>
        </Show>
      </Show>
    </>
  );
};

export default TreeNode;
