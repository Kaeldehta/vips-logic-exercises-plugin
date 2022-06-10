import FitchProof from "../../components/fitch/FitchProof";
import FitchProofTaskRender from "../../components/fitch/FitchProofTaskRender";
import FormProvider from "../../components/FormProvider";
import { fitchProofSchema } from "../../schemas/solve";
import { RESPONSE } from "../../utils";


export default () => <FormProvider defaultValues={RESPONSE} schema={fitchProofSchema} >
  <FitchProofTaskRender />
  <FitchProof />
</FormProvider>