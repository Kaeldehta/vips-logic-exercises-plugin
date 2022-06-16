import { createContext, useContext } from "solid-js";
import storeFactory from "../storeFactory";
import { TaskType } from "../schemas/edit";

const TaskStoreContext = createContext(storeFactory(TASK as TaskType));

const useTaskStoreContext = () => useContext(TaskStoreContext);

export default useTaskStoreContext;
