import Formula from "../Formula";
import Statements from "../Statements";


const FitchProofEdit = () => {

  return <div class="flex flex-row items-center gap-1">
    <Statements />
    <div>{"\u22A2"}<sub>FC</sub></div>
    <Formula name="consequence" />
  </div>
}

export default FitchProofEdit;