import { batch, createSignal, For, JSX } from "solid-js";
import { produce } from "solid-js/store";
import { formulaRegex, FormulaType } from "../schemas/common";
import FormulaRender from "./FormulaRender";

const width = [
  "w-4",
  "w-12",
  "w-20",
  "w-24",
  "w-28",
  "w-36",
  "w-40",
  "w-48",
  "w-52",
  "w-56",
];

interface FormulaProps {
  value: FormulaType;
  setValue: (produce: (state: string[]) => string[]) => void;
  name: string;
  max?: number;
  match?: RegExp;
  width?: string;
}
type EventHandler = JSX.EventHandlerUnion<HTMLDivElement, KeyboardEvent>;

const Formula = (props: FormulaProps) => {
  const [cursor, setCursor] = createSignal(props.value.length);

  const onKeyPress: EventHandler = (e) => {
    const value = e.key.match(/[fgh]/) ? e.key.toUpperCase() : e.key;
    const last = props.value[cursor() - 1] ?? "";

    if (value.match(/[1-9]/)) {
      if (last.match(/^[xyzpqrabc]|[FGH][1-9]?$/))
        props.setValue(
          produce<FormulaType>((state) => {
            state[cursor() - 1] += value;
          })
        );
    } else if (value.match(props.match ?? formulaRegex)) {
      if (props.max && props.value.length >= props.max) return;

      batch(() => {
        props.setValue(
          produce<FormulaType>((state) => {
            state.splice(cursor(), 0, value);
          })
        );
        setCursor((cursor) => cursor + 1);
      });
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
        class={`select-none group shrink-0 ${
          props.max ? width[props.max] : "w-52"
        } min-w-fit h-12 px-2 py-1 border border-solid flex items-center justify-start cursor-text`}
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
