import { Index } from "solid-js";
import { FitchProofTask } from "../../schemas/edit";
import FormulaRender from "../FormulaRender";

declare const TASK: FitchProofTask;

const FitchProofTaskRender = () => {
  const { consequence, statements } = TASK;

  return (
    <div class="flex gap-1 justify-start mb-8">
      Prove
      <Index each={statements}>
        {(statement, index) => (
          <b class="flex">
            <FormulaRender value={statement().statement} />
            {index < statements.length - 1 && ","}
          </b>
        )}
      </Index>
      <b>
        {"\u22A2"}
        <sub>FC</sub>
      </b>
      <b class="flex">
        <FormulaRender value={consequence} />
      </b>
    </div>
  );
};

export default FitchProofTaskRender;
