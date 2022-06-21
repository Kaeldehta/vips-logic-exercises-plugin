import { Component, lazy } from "solid-js";
import { Dynamic } from "solid-js/web";
import { SemanticTreeType } from "../../../schemas/solve";

export interface TreeLineProps {
  index: number;
  line: SemanticTreeType[number];
}

const components = {
  rule: lazy(
    () =>
      import(`./rule.${VIEW}.tsx`) as Promise<{
        default: Component<TreeLineProps>;
      }>
  ),
  ass: lazy(
    () =>
      import(`./ass.${VIEW}.tsx`) as Promise<{
        default: Component<TreeLineProps>;
      }>
  ),
  abs: lazy(
    () =>
      import(`./abs.${VIEW}.tsx`) as Promise<{
        default: Component<TreeLineProps>;
      }>
  ),
};

const Additional = lazy(
  () =>
    import(`./additional.${VIEW}.tsx`) as Promise<{
      default: Component<TreeLineProps>;
    }>
);

const TreeLine = (props: TreeLineProps) => {
  return (
    <div class="h-16 w-[30.5rem] group flex justify-start gap-2 items-center">
      <span>{props.index + 1}</span>
      <Dynamic component={components[props.line.type]} {...props} />
      <Additional {...props} />
    </div>
  );
};

export default TreeLine;
