import { Dispatch, SetStateAction } from "react";
import Button from "./Button";


interface TaskTypeSelectProps {
    setType: Dispatch<SetStateAction<"fc" | "tree" | undefined>>
}

const TaskTypeSelect = ({setType}: TaskTypeSelectProps) => {

    return <>
    <button type="button" onClick={() => setType("fc")}>Fitch Calculus Proof</button>
    <button onClick={() => setType("tree")}>Semantic Tree</button>
    </>
}

export default TaskTypeSelect;