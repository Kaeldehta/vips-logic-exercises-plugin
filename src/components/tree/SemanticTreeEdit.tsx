import useTaskStoreContext from "../../contexts/edit";
import Formula from "../Formula";
import Statements from "../Statements";


const SemanticTreeEdit = () => {

  const [store, set] = useTaskStoreContext();

  return <div class="flex flex-row items-center gap-1">
    <Statements />
    {"\u22A8"}
    <Formula value={store.consequence} setValue={(v) => set("consequence", v)} />
  </div>
}

export default SemanticTreeEdit;