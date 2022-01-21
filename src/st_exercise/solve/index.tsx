import TaskRender from "../../TaskRender";
import { Task } from "../../domain";
import { render } from "react-dom";
import { Response } from "../types";
import { useState } from "@hookstate/core";
import NodeComponent from "./Node";
import { nanoid } from "nanoid";
import "./index.css"
import { useEffect } from "react";

interface SolveCompomentProps {
    task: Task
    response: Response
}

const SolveComponent = ({task, response}: SolveCompomentProps) => {

    const state = useState(response);

    useEffect(() => {
        console.log(state.value)
    },[state.value]);

    return <div className="w-full">
        <TaskRender task={task} separator={"\u22A8"}/>
        <div className="flex flex-col gap-1">
            <NodeComponent nodeState={state.root}/>
        </div>
        
        
    </div>
}

const element = document.getElementById("exercise-container");

declare const REACT_PROPS: {task: Task, response: Response};

const id = nanoid();

render(<SolveComponent {...REACT_PROPS} response={{
    root: {
        id: id,
        line: {
            formula: "p",
            from: {

            }
        },
        next: {
            id: nanoid(),
            line: {
                formula: "",
                from: {

                }
            }
        }
    }
}}/>, element);