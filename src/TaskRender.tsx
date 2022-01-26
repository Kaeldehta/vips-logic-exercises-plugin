import { ReactNode } from "react";
import { Task } from "./domain";
import { useTask } from "./utils";

interface Props {
    separator: ReactNode
}

const TaskRender = ({separator}: Props) => {

    const task = useTask();

    return <b className="flex gap-3 ml-10 mb-10 justify-start items-center">{task.statements.map((statement, index) => <div key={index}>{statement}{index < task.statements.length - 1 && ","}</div>)}<div>{separator}</div><div>{task.consequence}</div></b>

}

export default TaskRender;