import { For, Index } from "solid-js"
import { FitchProofTask } from "../../schemas/edit"
import { TASK } from "../../utils"


const FitchProofTaskRender = () => {

  const { consequence, statements } = TASK as FitchProofTask

  return <div class="flex gap-1 justify-start mb-8">
    Prove
    <Index each={statements}>
    {(statement, index) => <b class="flex">{statement().statement}{index < statements.length - 1 && ","}</b>}
    </Index>
    <b>{"\u22A2"}<sub>FC</sub></b>
    <b class="flex">{consequence}</b>
  </div>
}

export default FitchProofTaskRender