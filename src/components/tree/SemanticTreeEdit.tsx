import Formula from "../Formula";
import Statements from "../Statements";


const SemanticTreeEdit = () => {

  return <div className="flex flex-row items-center gap-1">
    <Statements />
    {"\u22A8"}
    <Formula name="consequence" />
  </div>
}

export default SemanticTreeEdit;