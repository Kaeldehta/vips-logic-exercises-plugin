import EditComponent from "../EditComponent";
import { render } from "react-dom";
import "./edit.css";
import { Task } from "./domain";

interface Props {
    statements: string[],
    consequence: string
}

const Edit = (props: Props) => <EditComponent {...props} separator={<div>{"\u22A2"}<sub>FC</sub></div>}/>;

const element = document.getElementById("exercise-container");

declare const REACT_PROPS: {task: Task};

render(<Edit {...REACT_PROPS.task}/>, element);