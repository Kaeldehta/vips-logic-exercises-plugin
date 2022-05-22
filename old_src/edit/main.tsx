import { ComponentType, lazy, useState } from "react";
import render from "../render";
import TaskTypeSelect from "../components/TaskTypeSelect";
import { Task, ViewType } from "../types";
import { getTask } from "../utils";

const components = Object.fromEntries(Object.entries(import.meta.glob("./*/index.tsx")).map(([key, value]) => {

    const newKey = key.split("/").slice(1)[0]

    return [newKey, lazy(value as () => Promise<{default: ComponentType<{}>}>)];
}));

const EditView: ViewType = () => {

    const [taskType, setTaskType] = useState<Task["type"] | undefined>(getTask<Task>()?.type);

    if(!taskType) return <TaskTypeSelect setType={setTaskType} />

    const Component = components[taskType];

    return <Component />
}

render(EditView);