import { FitchProofType } from "../../schemas/solve";
import FitchProofFromSelect from "./FitchProofFromSelect";
import Formula from "../Formula";
import FromArrayRule from "./FitchProofFromArrayRule";
import IconButton from "../IconButton";
import Indent from "./Indent";
import useFitchProofStoreContext from "../../contexts/fitch";
import { produce } from "solid-js/store";
import MinusCircle from "../icons/MinusCircle";
import Tag from "../icons/Tag";
import { batch } from "solid-js";

interface FitchProofLineProps {
  index: number;
  line: FitchProofType[number];
}

const FitchProofLine = (props: FitchProofLineProps) => {
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
    <div class="h-16 min-w-fit flex justify-start gap-2 items-center">
      <div class="shrink-0 flex items-center w-12">{props.index + 1}</div>
      <input
        type="hidden"
        value={props.line.type}
        name={`response[${props.index}][type]`}
      />
      <Indent
        index={props.index}
        indentation={props.line.indentation}
        type={props.line.type}
      />
      {props.line.type !== "abs" ? (
        <Formula
          name={`response[${props.index}][formula]`}
          value={props.line.formula}
          setValue={(formula) => set(props.index, { formula })}
        />
      ) : (
        <span class="w-52 ">{"\u22A5"}</span>
      )}
      {props.line.type === "rule" && (
        <FromArrayRule
          index={props.index}
          from={props.line.from}
          rule={props.line.rule}
        />
      )}
      {props.line.type === "prem" && <div>Prem.</div>}
      {props.line.type === "ass" && <div>Ass.</div>}
      {props.line.type === "abs" && (
        <>
          <FitchProofFromSelect
            name={`response[${props.index}][from][0]`}
            index={props.index}
            value={props.line.from[0]}
            setValue={(from) =>
              set(props.index, "from" as never, 0, from as never)
            }
          />
          <FitchProofFromSelect
            name={`response[${props.index}][from][1]`}
            index={props.index}
            value={props.line.from[1]}
            setValue={(from) =>
              set(props.index, "from" as never, 1, from as never)
            }
          />
        </>
      )}
      {props.line.annotation !== undefined ? (
        <input
          class="h-12 border-gray-100 border border-solid px-1"
          value={props.line.annotation}
          name={`response[${props.index}][annotation]`}
          onInput={(e) =>
            set(
              props.index,
              "annotation",
              e.currentTarget.value === "" ? undefined : e.currentTarget.value
            )
          }
        />
      ) : (
        <IconButton
          title="Annotate"
          onClick={() => set(props.index, "annotation", "")}
        >
          <Tag />
        </IconButton>
      )}

      <IconButton title="Remove" onClick={remove} class="text-red-600">
        <MinusCircle />
      </IconButton>
    </div>
  );
};

export default FitchProofLine;
