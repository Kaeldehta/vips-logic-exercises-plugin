import { Index } from "solid-js";
import useSemanticTreeStoreContext from "../../../contexts/tree";
import { TreeAbsurdityType } from "../../../schemas/solve";
import TreeFromSelect from "./SemanticTreeFromSelect";

const TreeLineSolveAbs = (props: {
  line: TreeAbsurdityType;
  index: number;
}) => {
  const [, set] = useSemanticTreeStoreContext();

  return (
    <>
      <span class="w-52">{"\u22A5"}</span>
      <Index each={props.line.from}>
        {(from, index) => (
          <TreeFromSelect
            name={`response[${props.index}][from][${index}]`}
            value={from()}
            setValue={(from) =>
              set(props.index, "from" as never, index, from as never)
            }
          />
        )}
      </Index>
    </>
  );
};

export default TreeLineSolveAbs;
