import { createContext, useContext } from "solid-js";
import storeFactory from "../storeFactory";
import { taskSchema } from "../schemas/edit";

const TaskStoreContext = createContext(
  storeFactory(TASK ? taskSchema.parse(TASK) : TASK)
);

const useTaskStoreContext = () => useContext(TaskStoreContext);

export default useTaskStoreContext;
