import { Index } from "solid-js";
import useFitchProofStoreContext from "../../../contexts/fitch";

const PostIndent = (props: { indentation: number }) => {
  const [proof] = useFitchProofStoreContext();

  const maxIndent = () =>
    Math.max(...proof.map(({ indentation }) => indentation));

  return (
    <Index each={Array(maxIndent() - props.indentation).fill(0)}>
      {() => <div class="w-10" />}
    </Index>
  );
};

export default PostIndent;
