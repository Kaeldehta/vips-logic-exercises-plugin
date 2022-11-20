import { For, Match, Show, Switch } from "solid-js";
import { FormulaType } from "../schemas/common";

interface FormulaRenderProps {
  value: FormulaType;
  cursor?: number;
}

const Caret = (props: { condition: boolean }) => {
  return (
    <div
      class="w-px h-full"
      classList={{
        "group-focus:bg-black group-focus:animate-blink": props.condition,
      }}
    />
  );
};

const FormulaRender = (props: FormulaRenderProps) => {
  return (
    <>
      <For each={props.value}>
        {(c, index) => (
          <div class="flex items-center h-full">
            <Caret condition={index() === props.cursor} />
            <Switch fallback={<div>{c}</div>}>
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
                <div>&not;</div>
              </Match>
              <Match when={c === "o"}>
                <div class="mx-1">&harr;</div>
              </Match>
              <Match when={c === "u"}>
                <div>&forall;</div>
              </Match>
              <Match when={c === "e"}>
                <div>&exist;</div>
              </Match>
              <Match when={c === "m"}>
                <div>{"\u22A5"}</div>
              </Match>
              <Match when={c.match(/[pqrxyxabc]/)}>
                <div>
                  {c[0]}
                  <Show when={c[1]}>
                    <sub>{c[1]}</sub>
                  </Show>
                </div>
              </Match>
              <Match when={c.match(/[FGH]/)}>
                <div>
                  {c[0]}
                  <div class="inline-flex flex-col">
                    <Show when={c[1]}>
                      <sup>{c[1]}</sup>
                    </Show>
                    <Show when={c[2]}>
                      <sub>{c[2]}</sub>
                    </Show>
                  </div>
                </div>
              </Match>
            </Switch>
          </div>
        )}
      </For>
      <Caret condition={props.cursor === props.value.length} />
    </>
  );
};

export default FormulaRender;
