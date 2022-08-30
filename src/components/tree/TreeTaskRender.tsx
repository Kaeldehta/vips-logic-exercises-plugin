import { Index, Show } from "solid-js";
import { semanticTreeTask } from "../../schemas/edit";
import FormulaRender from "../FormulaRender";

const task = semanticTreeTask.parse(TASK);

const TreeTaskRender = () => {
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
        {"\u22A8"}
        <Show when={predicate}>
          <sub>P</sub>
        </Show>
      </b>

      <b class="flex">
        <FormulaRender value={consequence} />
      </b>
    </div>
  );
};

export default TreeTaskRender;
