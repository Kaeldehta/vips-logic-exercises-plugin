import { Show } from "solid-js";
import Fitch from "../components/fitch";
import FitchProofTaskRender from "../components/fitch/FitchProofTaskRender";
import UndoHandler from "../components/UndoHandler";

export default () => (
  <>
    <FitchProofTaskRender />
    <Show when={VIEW !== "correct"}>
      <UndoHandler />
    </Show>
    <Fitch />
  </>
);
