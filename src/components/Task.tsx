import { ReactNode } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Task as TaskType } from "../types";
import { renderFormulaAsHTML } from "../utils";

const typeToSeparator: Record<TaskType["type"], ReactNode> = {
    "fitch_calculus": <>{"\u22A2"}<sub>FC</sub></>,
    "semantic_tree": "\u22A8"
}

const Task = () => {

    const task = (useSelector as TypedUseSelectorHook<{task: TaskType}>)(state => state.task);

    return <b className="flex gap-3 ml-10 mb-10 justify-start items-center">{Object.entries(task.statements.entries).map(([id, statement], index) => <div key={id} className="flex items-center justify-start">{renderFormulaAsHTML(statement)}{index < task.statements.ids.length - 1 && ","}</div>)}<div>{typeToSeparator[task.type]}</div><div className="flex items-center justify-start">{renderFormulaAsHTML(task.consequence)}</div></b>
}

export default Task;