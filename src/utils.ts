import { Path } from "@hookstate/core";
import { createContext, useContext } from "react";
import { Task } from "./domain";

export const pathToPHPFormName = (path: Path): string => path.slice(1).reduce<string>((agg, cur) => agg + "[" + cur + "]", path[0] as string);

export const TaskContext = createContext<Task["answers"][0]>({
    consequence: "",
    statements: [],
    predicateLogic: false
})
export const useTask = () => useContext(TaskContext);