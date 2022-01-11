import EditComponent from "../EditComponent";
import { render } from "react-dom";
import "./edit.css";

interface Props {
    statements: string[],
    consequence: string
}

const Edit = (props: Props) => <EditComponent {...props} separator={<div>{"\u22A2"}<sub>FC</sub></div>}/>;

const element = document.getElementById("exercise-container");

declare const REACT_PROPS: {consequence: string, statements: string[]};

render(<Edit {...REACT_PROPS}/>, element);