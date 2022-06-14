import { Index } from "solid-js";
import useFitchProofStoreContext from "../../contexts/fitch";

interface FitchProofFromSelectProps {
  index: number;
  value: number;
  setValue: (newValue: number) => void;
}

const FitchProofFromSelect = (props: FitchProofFromSelectProps) => {
  const [proof] = useFitchProofStoreContext();

  const options = () => proof.filter((_, i) => i < props.index);

  return (
    <select
      value={props.value}
      class="w-20"
      onChange={(e) => {
        const index = parseInt(e.currentTarget.value);
        props.setValue(index);
      }}
    >
      <option hidden value={-1} />
      <Index each={options()}>
        {(_, index) => <option value={index}>{index + 1}</option>}
      </Index>
    </select>
  );
};

export default FitchProofFromSelect;
