import {render} from "react-dom";
import {ProofLine, Response, Task} from "./domain";
import "./correct.css";

const Correct = ({lines}: {lines: ProofLine[]}) => {

    return <div>
    {lines.map((line) => <div key={line.id}>{JSON.stringify(line.line)}</div>)}
    </div>
}

const element = document.getElementById("exercise-container");

declare const REACT_PROPS: {response: Response, task: Task};

render(<Correct lines={REACT_PROPS.response.lines}/>, element);


