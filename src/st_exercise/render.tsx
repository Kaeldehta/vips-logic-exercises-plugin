import { nanoid } from "nanoid";
import { createContext, useContext } from "react";
import {render} from "react-dom";
import { Task } from "../domain";
import { TaskContext } from "../utils";
import { Response } from "./types";

export declare const REACT_PROPS: {
    task: Task,
    response?: Response
};

const element = document.getElementById("exercise-container");

const ResponseContext = createContext<Response>({
    root: {
        line: {
            formula: ""
        },
        id: nanoid()
    }
}
);

export const useResponse = () => useContext(ResponseContext);

export const renderFromPHP = (Component: () => JSX.Element) => {

    if(REACT_PROPS.task.answers.length > 0 && REACT_PROPS.response) {
        return render(<TaskContext.Provider value={REACT_PROPS.task.answers[0]}>
            <ResponseContext.Provider value={REACT_PROPS.response}>
                <Component/>
            </ResponseContext.Provider>
        </TaskContext.Provider>, element);
    }

    if(REACT_PROPS.task.answers.length > 0) {
        return render(<TaskContext.Provider value={REACT_PROPS.task.answers[0]}>
            <Component/>
        </TaskContext.Provider>, element);
    }

    if(REACT_PROPS.response) {
        return render(<ResponseContext.Provider value={REACT_PROPS.response}>
            <Component/>
        </ResponseContext.Provider>, element);
    }

    return render(<Component/>, element);

    
}