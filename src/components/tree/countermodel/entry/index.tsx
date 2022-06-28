import { Component, lazy, Match, Switch } from "solid-js";
import { CounterModelEntryType } from "../../../../schemas/solve";

export interface TreeCounterModelEntryProps {
  entry: CounterModelEntryType;
  index: number;
}

const Additional = lazy(
  () =>
    import(`./additional.${VIEW}.tsx`) as Promise<{
      default: Component<TreeCounterModelEntryProps>;
    }>
);

const PropositionalModel = lazy(
  () =>
    import(`./propositional.${VIEW}.tsx`) as Promise<{
      default: Component<TreeCounterModelEntryProps>;
    }>
);

const PredicateModel = lazy(
  () =>
    import(`./predicate.${VIEW}.tsx`) as Promise<{
      default: Component<TreeCounterModelEntryProps>;
    }>
);

const TreeCounterModelEntry = (props: TreeCounterModelEntryProps) => {
  return (
    <div class="flex justify-start w-full gap-2 items-center">
      <Switch>
        <Match when={props.entry.type === "predicate"}>
          <PredicateModel {...props} />
        </Match>
        <Match when={props.entry.type === "propositional"}>
          <PropositionalModel {...props} />
        </Match>
      </Switch>
      <Additional {...props} />
    </div>
  );
};

export default TreeCounterModelEntry;
