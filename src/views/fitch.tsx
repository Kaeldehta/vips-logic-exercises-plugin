import Fitch from "../components/fitch";
import FitchProofTaskRender from "../components/fitch/FitchProofTaskRender";
import UndoHandler from "../components/UndoHandler";

export default () => (
  <>
    <FitchProofTaskRender />
    <UndoHandler />
    <Fitch />
  </>
);
