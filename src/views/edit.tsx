import Edit from "../components/Edit";
import FormProvider from "../components/FormProvider";
import { taskSchema } from "../schemas";
import { TASK } from "../utils";

export default () => <FormProvider defaultValues={TASK} schema={taskSchema}><Edit /></FormProvider>