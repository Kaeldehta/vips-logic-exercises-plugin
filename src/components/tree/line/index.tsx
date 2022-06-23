import { Component, lazy } from "solid-js";
import { Dynamic } from "solid-js/web";
import { TreeNodeProps } from "../node";

const components = {
  rule: lazy(
    () =>
      import(`./rule.${VIEW}.tsx`) as Promise<{
        default: Component<TreeNodeProps>;
      }>
  ),
  ass: lazy(
    () =>
      import(`./ass.${VIEW}.tsx`) as Promise<{
        default: Component<TreeNodeProps>;
      }>
  ),
  abs: lazy(
    () =>
      import(`./abs.${VIEW}.tsx`) as Promise<{
        default: Component<TreeNodeProps>;
      }>
  ),
};

const Additional = lazy(
  () =>
    import(`./additional.${VIEW}.tsx`) as Promise<{
      default: Component<TreeNodeProps>;
    }>
);

const TreeLine = (props: TreeNodeProps) => {
  return (
    <div class="h-16 w-[30.5rem] group flex justify-start gap-2 items-center">
      <span>{props.index + 1}</span>
      <Dynamic component={components[props.line.type]} {...props} />
      <Additional {...props} />
    </div>
  );
};

export default TreeLine;
