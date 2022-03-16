import { ReactNode } from "react"
import Answer from "../components/Answer"


const CorrectComponent = ({separator, children}: {children: ReactNode, separator: ReactNode}) => {


    return <div>
        <Answer separator={separator}/>

        {children}
    </div>
}

export default CorrectComponent;