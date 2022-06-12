import useFitchProofStoreContext from "../../contexts/fitch";
import FitchProofLine from "./FitchProofLine";
import Inserter from "./Inserter";
import { For } from "solid-js";
import Submitter from "../Submitter";
import { fitchProofSchema } from "../../schemas/solve";


const FitchProof = () => {

  const [store, set] = useFitchProofStoreContext();

  return <>
    <For each={store} fallback={<button onClick={() => set([{ type: "prem", indentation: 0, formula: "" }])} type="button">Add</button>}>
      {(line, i) => <>
        <FitchProofLine index={i()} line={line} />
        <Inserter index={i()} type={line.type} indentation={line.indentation} />
      </>
      }
    </For>
    <Submitter values={store} schema={fitchProofSchema} />
  </>
}

export default FitchProof;