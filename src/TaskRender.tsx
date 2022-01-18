import { Task } from "./domain";

interface Props {
    task: Task
    separator: JSX.Element
}

const TaskRender = ({task, separator}: Props) => {
    return <b className="flex gap-3 ml-10 mb-10 justify-start items-center">{task.statements.map((statement, index) => <div key={index}>{statement}{index < task.statements.length - 1 && ","}</div>)}<div>{separator}</div><div>{task.consequence}</div></b>

}

export default TaskRender;