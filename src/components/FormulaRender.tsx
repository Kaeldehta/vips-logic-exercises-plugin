import { For, Match, Switch } from "solid-js";

interface FormulaRenderProps {
  value: string;
}

const FormulaRender = (props: FormulaRenderProps) => {
  return (
    <For each={Array.from(props.value)}>
      {(c) => (
        <div class="last:group-focus:text-red-500">
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
            <Match when={c === "n"}>&not;</Match>
            <Match when={c === "o"}>
              <div class="mx-1">&harr;</div>
            </Match>
            <Match when={c === "u"}>&forall;</Match>
            <Match when={parseInt(c)}>
              <sub>{c}</sub>
            </Match>
          </Switch>
        </div>
      )}
    </For>
  );
};

export default FormulaRender;
