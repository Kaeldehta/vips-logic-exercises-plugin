import useFitchProofStoreContext from "../../contexts/fitch";
import FitchProofLine from "./FitchProofLine";
import Inserter from "./Inserter";
import { For } from "solid-js";
import { fitchProofSchema } from "../../schemas/solve";
import Validator from "../Validator";

const FitchProof = () => {
  const [store, set] = useFitchProofStoreContext();

  return (
    <>
      <For
        each={store}
        fallback={
          <button
            onClick={() => set([{ type: "prem", indentation: 0, formula: "" }])}
            type="button"
          >
            Add
          </button>
        }
      >
        {(line, i) => (
          <div class="flex flex-col group hover:bg-gray-100 rounded-md">
            <FitchProofLine index={i()} line={line} />
            <Inserter
              index={i()}
              type={line.type}
              indentation={line.indentation}
            />
          </div>
        )}
      </For>
      <Validator values={store} schema={fitchProofSchema} />
    </>
  );
};

export default FitchProof;
