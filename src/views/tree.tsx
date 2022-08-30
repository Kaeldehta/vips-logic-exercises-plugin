import Tree from "../components/tree";
import TreeTaskRender from "../components/tree/TreeTaskRender";
import UndoHandler from "../components/UndoHandler";

export default () => (
  <>
    <TreeTaskRender />
    <UndoHandler />
    <Tree />
  </>
);
