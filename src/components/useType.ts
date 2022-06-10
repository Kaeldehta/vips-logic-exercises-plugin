import { useFormContext } from "react-hook-form"
import { FitchProofType } from "../schemas/solve";


const useType = (index: number) => {

  const { getValues } = useFormContext<FitchProofType>();

  return getValues(`proof.${index}.type`)

}

export default useType;