import { Show } from "solid-js";
import useStoreContext from "../../../context";
import { FitchProofType } from "../../../schemas/fitch";
import IconButton from "../../IconButton";
import Tag from "../../icons/Tag";

const FitchLineAnnotationSolve = (props: {
  annotation: FitchProofType[number]["annotation"];
  index: number;
}) => {
  const [, set] = useStoreContext<FitchProofType>();

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
