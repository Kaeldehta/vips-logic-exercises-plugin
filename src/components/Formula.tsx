import { batch, createSignal, For, JSX } from "solid-js";
import { produce } from "solid-js/store";
import { FormulaType } from "../schemas/common";
import { TaskType } from "../schemas/edit";
import FormulaRender from "./FormulaRender";

const propositionalLogicChars = /^[pqriklno()]$/;

const predicateLogicChars = /^[abcFGHxyzue=]$/;

interface FormulaProps {
  value: FormulaType;
  setValue: (produce: (state: string[]) => string[]) => void;
  name: string;
}

const allowPred = VIEW === "edit" || (TASK as TaskType | undefined)?.predicate;

type EventHandler = JSX.EventHandlerUnion<HTMLDivElement, KeyboardEvent>;

const Formula = (props: FormulaProps) => {
  const [cursor, setCursor] = createSignal(props.value.length);

  const onKeyPress: EventHandler = (e) => {
    const value = e.key;
    if (
      value.match(propositionalLogicChars) ||
      (allowPred && e.key.match(predicateLogicChars))
    ) {
      batch(() => {
        props.setValue(
          produce<FormulaType>((state) => {
            state.splice(cursor(), 0, value);
          })
        );
        setCursor((cursor) => cursor + 1);
      });
    } else {
      const last = props.value[cursor() - 1] ?? "";
      if (value.match(/[1-9]/) && last.match(/^[xyzpqrabc]|[FGH][1-9]?$/)) {
        props.setValue(
          produce<FormulaType>((state) => {
            state[cursor() - 1] += value;
          })
        );
      }
    }
  };

  const onKeyDown: EventHandler = (e) => {
    if (e.key === "Backspace") {
      if (cursor() > 0) {
        batch(() => {
          props.setValue(
            produce<FormulaType>((state) => {
              state.splice(cursor() - 1, 1);
            })
          );
          setCursor((cursor) => cursor - 1);
        });
      }
    } else if (e.key === "ArrowLeft" && cursor() > 0) {
      e.preventDefault();
      setCursor((cursor) => cursor - 1);
    } else if (e.key === "ArrowRight" && cursor() < props.value.length) {
      e.preventDefault();
      setCursor((cursor) => cursor + 1);
    }
  };

  const onClick: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (e) => {
    const offsets = Array.from(e.currentTarget.children).map((el) =>
      Math.abs((el as HTMLElement).offsetLeft - e.x)
    );

    setCursor(offsets.indexOf(Math.min(...offsets)));
  };

  return (
    <>
      <For each={props.value}>
        {(c, index) => (
          <input type="hidden" value={c} name={props.name + `[${index()}]`} />
        )}
      </For>
      <div
        class="select-none group shrink-0 w-52 min-w-fit h-12 px-2 py-1 border border-solid flex items-center justify-start cursor-text "
        tabIndex={0}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        <FormulaRender cursor={cursor()} value={props.value} />
      </div>
    </>
  );
};

export default Formula;
