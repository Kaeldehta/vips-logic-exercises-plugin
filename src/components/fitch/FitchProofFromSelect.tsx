import { Index, JSX } from "solid-js";
import useStoreContext from "../../context";
import { FitchProofType } from "../../schemas/fitch";

interface FitchProofFromSelectProps {
  index: number;
  value: number;
  setValue: (newValue: number) => void;
  name: string;
}

const FitchProofFromSelect = (props: FitchProofFromSelectProps) => {
  const [proof] = useStoreContext<FitchProofType>();

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
