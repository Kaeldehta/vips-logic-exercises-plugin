import { Component, For, lazy } from "solid-js";
import useFitchProofStoreContext from "../../contexts/fitch";
import FitchLine from "./line";

const Fallback = lazy(
  () =>
    import(`./fallback.${VIEW}.tsx`) as Promise<{
      default: Component;
    }>
);

const Additional = lazy(
  () => import(`./additional.${VIEW}.tsx`) as Promise<{ default: Component }>
);

const Fitch = () => {
  const [fitch] = useFitchProofStoreContext();

  return (
    <>
      <For each={fitch} fallback={<Fallback />}>
        {(line, i) => <FitchLine index={i()} line={line} />}
      </For>
      <Additional />
    </>
  );
};

export default Fitch;
