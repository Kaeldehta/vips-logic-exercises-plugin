import { For, Index, Match, Switch } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { Dynamic } from "solid-js/web";


interface FormulaProps {
  allowPred: boolean
  setValue: (newValue: string) => void
  value: string
}

const propositionalLogicChars = /^[pqr12345789iklno\(\)]$/

const predicateLogicChars = /^[abcFGHxyzue=]$/;

const Formula = (props: FormulaProps) => {

  return <div
    // contentEditable
    class="group shrink-0 w-52 min-w-fit h-12 px-2 py-1 border-solid border flex items-center justify-start cursor-pointer focus:outline-none focus:bg-gray-200"
    tabIndex={0}
    onKeyPress={e => {
      if (e.key.match(propositionalLogicChars) || (props.allowPred && e.key.match(predicateLogicChars))) {
        props.setValue(props.value + e.key);
      }
    }}
    onKeyDown={e => {
      if (e.key === "Backspace") {
        props.setValue(props.value.slice(0, -1));
      }
    }}
  >
    <For each={Array.from(props.value)}>{
      (c) => <div class="last:group-focus:text-red-500">
        <Switch fallback={c}>
          <Match when={c === "i"}>
            <div class="mx-1">&rarr;</div>
          </Match>
          <Match when={c === "k"}>
            <div class="mx-1">&and;</div>
          </Match>
          <Match when={c === "l"}>
            <div class="mx-1">&or;</div>
          </Match>
          <Match when={c === "="}>
            <div class="mx-1">=</div>
          </Match>
          <Match when={c === "n"}>
            &not;
          </Match>
          <Match when={c === "o"}>
            <div class="mx-1">&harr;</div>
          </Match>
          <Match when={c === "u"}>
            &forall;
          </Match>
          <Match when={parseInt(c)}>
            <sub>{c}</sub>
          </Match>
        </Switch>
      </div>
    }</For>
  </div>
}

export default Formula;