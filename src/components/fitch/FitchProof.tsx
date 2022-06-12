import useFitchProofStoreContext from "../../contexts/fitch";
import FitchProofLine from "./FitchProofLine";
import Inserter from "./Inserter";
import { For } from "solid-js";


const FitchProof = () => {

  const [proof, set] = useFitchProofStoreContext();

  return <For each={proof} fallback={<button onClick={() => set([{type: "prem", indentation: 0, formula: ""}])} type="button">Add</button>}>
  {(line, i) => <>
    <FitchProofLine index={i()} line={line}/>
    <Inserter index={i()} line={line}/>
    </>
  }
  </For>

}

export default FitchProof;