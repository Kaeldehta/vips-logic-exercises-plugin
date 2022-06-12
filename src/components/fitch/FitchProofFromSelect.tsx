import { createEffect, createSignal, For } from "solid-js";
import useFitchProofStoreContext from "../../contexts/fitch";

interface FitchProofFromSelectProps {
  index: number
  value: number
  setValue: (newValue: number) => void
}

const FitchProofFromSelect = (props: FitchProofFromSelectProps) => {

  const [proof] = useFitchProofStoreContext();

  const options = () => proof.filter((_, i) => i < props.index);

  const [selected, setSelected] = createSignal(proof[props.value]);

  const index = () => proof.indexOf(selected())

  createEffect(() => {
    props.setValue(index())
  })

  return <select class="w-20" onChange={(e) => {
    const index = parseInt(e.currentTarget.value);
    setSelected(options()[index])
  }}>
    <option hidden value={-1} />
    <For each={options()}>
      {(_, index) => <option value={index()}>{index() + 1}</option>}
    </For>
  </select>
}

export default FitchProofFromSelect;