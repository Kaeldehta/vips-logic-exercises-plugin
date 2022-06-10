import FormProvider from "../../components/FormProvider";
import NumberUpdater from "../../components/tree/NumberUpdater";
import SemanticTree from "../../components/tree/SemanticTree";
import { semanticTreeSchema } from "../../schemas/solve";
import { RESPONSE } from "../../utils";

export default () => <FormProvider defaultValues={RESPONSE} schema={semanticTreeSchema}>
  <SemanticTree />
  <NumberUpdater />
</FormProvider>