import useTaskStoreContext from "../../contexts/edit";
import Formula from "../Formula";
import Statements from "../Statements";

const SemanticTreeEdit = () => {
  const [store, set] = useTaskStoreContext();

  return (
    <div class="flex flex-row items-center gap-1">
      <Statements />
      {"\u22A8"}
      <Formula
        name="task[consequence]"
        value={store?.consequence ?? []}
        setValue={(v) => set("consequence", v)}
      />
    </div>
  );
};

export default SemanticTreeEdit;
