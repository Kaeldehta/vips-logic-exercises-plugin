/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { lazy, ParentComponent, Show } from "solid-js";
import useStoreContext from "../../../context";
import { SemanticTreeType } from "../../../schemas/tree";
import TreeLine from "../line";

export interface TreeNodeProps {
  line: SemanticTreeType["nodes"][number];
  index: number;
  end: number;
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
            <Show when={props.index !== props.end}>
              <TreeNode
                index={props.index + 1}
                line={tree.nodes[props.index + 1]}
                end={props.end}
              />
            </Show>
          }
        >
          <div class="flex gap-8">
            <div class="flex flex-col gap-1 justify-start items-center">
              <TreeNode
                index={props.index + 1}
                line={tree.nodes[props.index + 1]}
                end={props.line.right! - 1}
              />
            </div>
            <div class="flex flex-col gap-1 justify-start items-center">
              <TreeNode
                index={props.line.right!}
                line={tree.nodes[props.line.right!]}
                end={props.end}
              />
            </div>
          </div>
        </Show>
      </Show>
    </>
  );
};

export default TreeNode;
