import { Index } from "solid-js";
import useSemanticTreeStoreContext from "../../../contexts/tree";

interface TreeFromSelectProps {
  value: number;
  setValue: (newValue: number) => void;
  name: string;
}

const TreeFromSelect = (props: TreeFromSelectProps) => {
  const [proof] = useSemanticTreeStoreContext();

  return (
    <select
      name={props.name}
      value={props.value}
      class="w-20"
      onChange={(e) => {
        const index = parseInt(e.currentTarget.value);
        props.setValue(index);
      }}
    >
      <option hidden value={-1} />
      <Index each={proof}>
        {(_, index) => <option value={index}>{index + 1}</option>}
      </Index>
    </select>
  );
};

export default TreeFromSelect;
