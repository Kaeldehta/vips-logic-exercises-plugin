import { Index } from "solid-js";
import useSemanticTreeStoreContext from "../../contexts/tree";

interface SemanticTreeFromSelectProps {
  value: number
  setValue: (newValue: number) => void
}

const SemanticTreeFromSelect = (props: SemanticTreeFromSelectProps) => {

  const [proof] = useSemanticTreeStoreContext();

  return <select value={props.value} class="w-20" onChange={(e) => {
    const index = parseInt(e.currentTarget.value);
    props.setValue(index)
  }}>
    <option hidden value={-1} />
    <Index each={proof}>
      {(_, index) => <option value={index}>{index + 1}</option>}
    </Index>
  </select>
}

export default SemanticTreeFromSelect;