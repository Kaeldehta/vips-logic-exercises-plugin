import { useFormContext } from "react-hook-form";
import { TaskType } from "../schemas/edit";
import FitchProofEdit from "./fitch/FitchProofEdit";
import SemanticTreeEdit from "./tree/SemanticTreeEdit";


const Edit = () => {

  const { watch, setValue } = useFormContext<TaskType>();

  const type = watch("type")

  return <div>{!type && <>
    <button type="button" onClick={() => setValue("type", "tree")}>Semantic Tree</button>
    <button type="button" onClick={() => setValue("type", "fitch")}>Fitch Proof</button>
  </>}
    {type === "fitch" && <FitchProofEdit />}
    {type === "tree" && <SemanticTreeEdit />}
  </div>
}

export default Edit;