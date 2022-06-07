import FitchProof from "../../components/FitchProof";
import FormProvider from "../../components/FormProvider";
import { fitchProofSchema } from "../../schemas";


export default () => <FormProvider schema={fitchProofSchema} ><FitchProof /></FormProvider>