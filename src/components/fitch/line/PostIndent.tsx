import { Index } from "solid-js";
import useStoreContext from "../../../context";
import { FitchProofType } from "../../../schemas/fitch";

const PostIndent = (props: { indentation: number }) => {
  const [proof] = useStoreContext<FitchProofType>();

  const maxIndent = () =>
    Math.max(...proof.map(({ indentation }) => indentation));

  return (
    <Index each={Array(maxIndent() - props.indentation).fill(0)}>
      {() => <div class="w-10" />}
    </Index>
  );
};

export default PostIndent;
