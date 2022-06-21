import { Show } from "solid-js";
import useFitchProofStoreContext from "../../../contexts/fitch";
import { FitchProofType } from "../../../schemas/solve";
import IconButton from "../../IconButton";
import Tag from "../../icons/Tag";

const FitchLineAnnotationSolve = (props: {
  annotation: FitchProofType[number]["annotation"];
  index: number;
}) => {
  const [, set] = useFitchProofStoreContext();

  return (
    <Show
      when={props.annotation !== undefined}
      fallback={
        <IconButton
          title="Annotate"
          onClick={() => set(props.index, "annotation", "")}
        >
          <Tag />
        </IconButton>
      }
    >
      <input
        class="h-12 border-gray-100 border border-solid px-1"
        value={props.annotation}
        name={`response[${props.index}][annotation]`}
        onInput={(e) =>
          set(
            props.index,
            "annotation",
            e.currentTarget.value === "" ? undefined : e.currentTarget.value
          )
        }
      />
    </Show>
  );
};

export default FitchLineAnnotationSolve;
