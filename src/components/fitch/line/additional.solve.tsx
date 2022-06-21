import { batch } from "solid-js";
import { produce } from "solid-js/store";
import { FitchLineProps } from ".";
import useFitchProofStoreContext from "../../../contexts/fitch";
import IconButton from "../../IconButton";
import MinusCircle from "../../icons/MinusCircle";

const FitchLineAdditionalSolve = (props: FitchLineProps) => {
  const [store, set] = useFitchProofStoreContext();

  const remove = () => {
    const line = props.line;

    let deleteCount = 1;

    if (line.type === "ass") {
      const indentation = line.indentation;
      for (let i = props.index + 1; i < store.length; i++) {
        const current = store[i];

        if (
          current.indentation < indentation ||
          (current.indentation === indentation && current.type === "ass")
        ) {
          break;
        }

        deleteCount++;
      }
    }
    batch(() => {
      set(
        (state) => state.type === "rule" || state.type === "abs",
        "from" as never,
        (from) => from >= props.index && from < props.index + deleteCount,
        -1 as never
      );
      set(
        (state) => state.type === "rule" || state.type === "abs",
        "from" as never,
        (from) => from >= props.index + deleteCount,
        (from) => from - deleteCount
      );
      set(
        produce((state) => {
          state.splice(props.index, deleteCount);
        })
      );
    });
  };

  return (
    <>
      <IconButton title="Remove" onClick={remove} class="text-red-600">
        <MinusCircle />
      </IconButton>
      <input
        type="hidden"
        value={props.line.type}
        name={`response[${props.index}][type]`}
      />
      <input
        type="hidden"
        value={props.line.indentation}
        name={`response[${props.index}][indentation]`}
      />
    </>
  );
};

export default FitchLineAdditionalSolve;
