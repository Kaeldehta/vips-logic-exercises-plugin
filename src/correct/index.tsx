import { ReactNode } from "react"
import Task from "../components/Task";

const CorrectComponent = ({children}: {children: ReactNode}) => {

    return <div>
        <Task/>

        {children}
    </div>
}

export default CorrectComponent;