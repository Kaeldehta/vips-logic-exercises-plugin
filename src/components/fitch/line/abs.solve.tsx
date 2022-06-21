import useFitchProofStoreContext from "../../../contexts/fitch";
import { FitchAbsurdityType } from "../../../schemas/solve";
import FitchProofFromSelect from "../FitchProofFromSelect";

const FitchLineAbsSolve = (props: {
  line: FitchAbsurdityType;
  index: number;
}) => {
  const [, set] = useFitchProofStoreContext();

  return (
    <>
      <span class="w-52 ">{"\u22A5"}</span>
      <FitchProofFromSelect
        name={`response[${props.index}][from][0]`}
        index={props.index}
        value={props.line.from[0]}
        setValue={(from) => set(props.index, "from" as never, 0, from as never)}
      />
      <FitchProofFromSelect
        name={`response[${props.index}][from][1]`}
        index={props.index}
        value={props.line.from[1]}
        setValue={(from) => set(props.index, "from" as never, 1, from as never)}
      />
    </>
  );
};

export default FitchLineAbsSolve;
