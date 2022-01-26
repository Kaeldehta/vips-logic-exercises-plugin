import TaskRender from "../../TaskRender";
import { useState } from "@hookstate/core";
import NodeComponent from "./Node";
import "./index.css"
import { renderFromPHP, useResponse } from "../render";

const SolveComponent = () => {

    const response = useResponse();

    const state = useState(response);

    return <div className="w-full">
            <TaskRender separator={"\u22A8"}/>
            <div className="flex flex-col gap-1">
                {<NodeComponent nodeState={state.root}/>}
            </div>
        </div>
    
}

renderFromPHP(SolveComponent);