import { Show } from "solid-js";
import Tree from "../components/tree";
import TreeTaskRender from "../components/tree/TreeTaskRender";
import UndoHandler from "../components/UndoHandler";

export default () => (
  <>
    <TreeTaskRender />
    <Show when={VIEW !== "correct"}>
      <UndoHandler />
    </Show>
    <Tree />
  </>
);
