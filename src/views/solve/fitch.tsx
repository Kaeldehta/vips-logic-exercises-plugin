import FitchProof from "../../components/FitchProof";
import FitchProofTaskRender from "../../components/FitchProofTaskRender";
import FormProvider from "../../components/FormProvider";
import { fitchProofSchema } from "../../schemas";
import { RESPONSE } from "../../utils";


export default () => <FormProvider defaultValues={RESPONSE} schema={fitchProofSchema} >
  <FitchProofTaskRender />
  <FitchProof />
</FormProvider>