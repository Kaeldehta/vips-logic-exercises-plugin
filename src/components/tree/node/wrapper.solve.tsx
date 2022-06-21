import { ParentProps, Show } from "solid-js";
import { TreeNodeProps } from ".";
import Inserter from "./Inserter";

const TreeSolveWrapper = (props: ParentProps<TreeNodeProps>) => {
  return (
    <div class="group hover:bg-gray-100 rounded-md p-1 flex flex-col justify-start items-center gap-2">
      {props.children}
      <Show when={props.line.type !== "abs"}>
        <Inserter
          index={props.index}
          end={props.end}
          right={props.line.right}
        />
      </Show>
    </div>
  );
};

export default TreeSolveWrapper;
