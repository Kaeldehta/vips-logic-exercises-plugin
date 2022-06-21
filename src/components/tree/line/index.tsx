import { Component, lazy } from "solid-js";
import { Dynamic } from "solid-js/web";
import { SemanticTreeType } from "../../../schemas/solve";

export interface TreeLineProps {
  index: number;
  line: SemanticTreeType[number];
}

const components = Object.fromEntries(
  ["rule", "ass", "abs"].map((type) => [
    type,
    lazy(
      () =>
        import(`./${type}.${VIEW}.tsx`) as Promise<{
          default: Component<TreeLineProps>;
        }>
    ),
  ])
);

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
