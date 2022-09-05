import { Index, Show } from "solid-js";
import useStoreContext from "../../../context";
import { SemanticTreeType, TreeAbsurdityType } from "../../../schemas/tree";
import TreeFromSelect from "./SemanticTreeFromSelect";

const TreeLineSolveAbs = (props: {
  line: TreeAbsurdityType;
  index: number;
}) => {
  const [, set] = useStoreContext<SemanticTreeType>();

  return (
    <>
      <span class="w-52 pl-4">{"\u22A5"}</span>
      from
      <Index each={props.line.from}>
        {(from, index) => (
          <>
            <TreeFromSelect
              name={`response[nodes][${props.index}][from][${index}]`}
              value={from()}
              setValue={(from) =>
                set("nodes", props.index, "from" as never, index, from as never)
              }
            />
            <Show when={index == 0}>and</Show>
          </>
        )}
      </Index>
    </>
  );
};

export default TreeLineSolveAbs;
