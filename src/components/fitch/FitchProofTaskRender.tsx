import { Index, Show } from "solid-js";
import { fitchProofTask } from "../../schemas/edit";
import FormulaRender from "../FormulaRender";

const task = fitchProofTask.parse(TASK);

const FitchProofTaskRender = () => {
  const { consequence, statements, predicate } = task;

  return (
    <div class="flex gap-1 justify-start mb-8">
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
        <sub>
          FC<Show when={predicate}>P</Show>
        </sub>
      </b>
      <b class="flex">
        <FormulaRender value={consequence} />
      </b>
    </div>
  );
};

export default FitchProofTaskRender;
