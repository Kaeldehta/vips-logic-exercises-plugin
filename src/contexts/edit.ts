import { createContext, useContext } from "solid-js";
import { TaskType } from "../schemas/edit";
import storeFactory from "../storeFactory";
import { TASK } from "../utils";

const TaskStoreContext = createContext(storeFactory(TASK as TaskType));

const useTaskStoreContext = () => useContext(TaskStoreContext);

export default useTaskStoreContext;
