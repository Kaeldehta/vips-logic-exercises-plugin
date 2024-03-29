import { Component, lazy, ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { FitchProofType } from "../../../schemas/fitch";
import Indent from "../Indent";
import PostIndent from "./PostIndent";

export interface FitchLineProps {
  index: number;
  line: FitchProofType[number];
}

const components = {
  rule: lazy(
    () =>
      import(`./rule.${VIEW}.tsx`) as Promise<{
        default: ParentComponent<FitchLineProps>;
      }>
  ),
  ass: lazy(
    () =>
      import(`./ass.${VIEW}.tsx`) as Promise<{
        default: ParentComponent<FitchLineProps>;
      }>
  ),
  abs: lazy(
    () =>
      import(`./abs.${VIEW}.tsx`) as Promise<{
        default: ParentComponent<FitchLineProps>;
      }>
  ),
  prem: lazy(
    () =>
      import(`./prem.${VIEW}.tsx`) as Promise<{
        default: ParentComponent<FitchLineProps>;
      }>
  ),
};

const Additional = lazy(
  () =>
    import(`./additional.${VIEW}.tsx`) as Promise<{
      default: Component<FitchLineProps>;
    }>
);

const Annotation = lazy(
  () =>
    import(`./annotation.${VIEW}.tsx`) as Promise<{
      default: Component<{
        annotation: FitchProofType[number]["annotation"];
        index: number;
      }>;
    }>
);

const Wrapper = lazy(
  () =>
    import(`./wrapper.${VIEW}.tsx`) as Promise<{
      default: ParentComponent<FitchLineProps>;
    }>
);

const FitchLine = (props: FitchLineProps) => {
  return (
    <Wrapper {...props}>
      <div class="h-16 min-w-fit flex justify-start gap-2 items-center">
        <div class="shrink-0 flex items-center w-12">{props.index + 1}</div>
        <Indent
          index={props.index}
          indentation={props.line.indentation}
          type={props.line.type}
        />
        <Dynamic component={components[props.line.type]} {...props}>
          <PostIndent indentation={props.line.indentation} />
        </Dynamic>
        <Annotation annotation={props.line.annotation} index={props.index} />
        <Additional {...props} />
      </div>
    </Wrapper>
  );
};

export default FitchLine;
