import { lazy, ParentComponent, Show, splitProps } from "solid-js";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import { SemanticTreeType } from "../../../schemas/solve";
import TreeLine from "../line";

export interface TreeNodeProps {
  line: SemanticTreeType[number];
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
  const [, others] = splitProps(props, ["end"]);

  const [tree] = useSemanticTreeStoreContext();

  return (
    <>
      <TreeLineWrapper {...props}>
        <TreeLine {...others} />
      </TreeLineWrapper>
      <Show when={props.line.type !== "abs"}>
        <Show
          when={props.line.right}
          fallback={
            <Show when={props.index !== props.end}>
              <TreeNode
                index={props.index + 1}
                line={tree[props.index + 1]}
                end={props.end}
              />
            </Show>
          }
        >
          <div class="flex gap-8">
            <div class="flex flex-col gap-1 justify-start items-center">
              <TreeNode
                index={props.index + 1}
                line={tree[props.index + 1]}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                end={props.line.right! - 1}
              />
            </div>
            <div class="flex flex-col gap-1 justify-start items-center">
              <TreeNode
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                index={props.line.right!}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                line={tree[props.line.right!]}
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
