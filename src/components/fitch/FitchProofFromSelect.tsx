import { Index, JSX } from "solid-js";
import useFitchProofStoreContext from "../../contexts/fitch";

interface FitchProofFromSelectProps {
  index: number;
  value: number;
  setValue: (newValue: number) => void;
  name: string;
}

const FitchProofFromSelect = (props: FitchProofFromSelectProps) => {
  const [proof] = useFitchProofStoreContext();

  const options = () => proof.filter((_, i) => i < props.index);

  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const index = parseInt(e.currentTarget.value);
    props.setValue(index);
  };

  return (
    <select
      name={props.name}
      value={props.value}
      class="w-20"
      onChange={onChange}
    >
      <option hidden value={-1} />
      <Index each={options()}>
        {(_, index) => <option value={index}>{index + 1}</option>}
      </Index>
    </select>
  );
};

export default FitchProofFromSelect;
