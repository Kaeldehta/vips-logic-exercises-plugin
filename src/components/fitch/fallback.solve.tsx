import { createUniqueId } from "solid-js";
import useStoreContext from "../../context";
import { FitchProofType } from "../../schemas/fitch";
import TextButton from "../TextButton";

const FitchFallbackSolve = () => {
  const [, set] = useStoreContext<FitchProofType>();

  return (
    <div class="justify-start flex gap-2">
      <TextButton
        onClick={() =>
          set([
            { type: "prem", indentation: 0, formula: [], id: createUniqueId() },
          ])
        }
      >
        Start with premise
      </TextButton>
      <TextButton
        onClick={() =>
          set([
            { type: "ass", indentation: 1, formula: [], id: createUniqueId() },
          ])
        }
      >
        Start with assumption
      </TextButton>
    </div>
  );
};

export default FitchFallbackSolve;
