import { render } from "react-dom";
import { Task } from "../../domain";
import EditComponent from "../../EditComponent";
import "./index.css";

interface Props {
    statements: string[],
    consequence: string
}

const Edit =  (props: Props) => <EditComponent {...props} separator={"\u22A8"}/>;

const element = document.getElementById("exercise-container");

declare const REACT_PROPS: {task: Task};

render(<Edit {...REACT_PROPS.task}/>, element);