import { JSX } from "solid-js";
import { TaskType } from "../schemas/edit";
import FormulaRender from "./FormulaRender";

const propositionalLogicChars = /^[pqr12345789iklno()]$/;

const predicateLogicChars = /^[abcFGHxyzue=]$/;

interface FormulaProps {
  value: string;
  setValue: (newValue: string) => void;
}

const allowPred = VIEW === "edit" || (TASK as TaskType | undefined)?.predicate;

type EventHandler = JSX.EventHandlerUnion<HTMLDivElement, KeyboardEvent>;

const Formula = (props: FormulaProps) => {
  const onKeyPress: EventHandler = (e) => {
    if (
      e.key.match(propositionalLogicChars) ||
      (allowPred && e.key.match(predicateLogicChars))
    ) {
      props.setValue(props.value + e.key);
    }
  };

  const onKeyDown: EventHandler = (e) => {
    if (e.key === "Backspace") {
      props.setValue(props.value.slice(0, -1));
    }
  };

  return (
    <div
      class="group shrink-0 w-52 min-w-fit h-12 px-2 py-1 border border-solid flex items-center justify-start cursor-text focus:outline-none focus:ring"
      tabIndex={0}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
    >
      <FormulaRender value={props.value} />
    </div>
  );
};

export default Formula;
