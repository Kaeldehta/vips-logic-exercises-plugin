import useStoreContext from "../../context";
import { FitchProofTask } from "../../schemas/edit";
import Formula from "../Formula";
import Statements from "../Statements";

const FitchProofEdit = () => {
  const [store, set] = useStoreContext<FitchProofTask>();

  return (
    <div class="flex flex-row items-center gap-1">
      <Statements />
      <div>
        {"\u22A2"}
        <sub>FC</sub>
      </div>
      <Formula
        name="task[consequence]"
        value={store.consequence ?? []}
        setValue={(v) => set("consequence", v)}
      />
    </div>
  );
};

export default FitchProofEdit;
