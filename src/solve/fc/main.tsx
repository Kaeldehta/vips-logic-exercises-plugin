import { FiArrowRightCircle, FiPlusCircle } from "react-icons/fi";
import Button from "../../components/Button";
import LineWrapper from "../../components/LineWrapper";
import render from "../../render";
import useFCSolution from "../../stores/fc";
import { ViewType } from "../../types";
import Lines from "./Lines";

const FCSolveView: ViewType = () => {

    const empty = useFCSolution(state => !state.ids.length)

    const insertPremise = useFCSolution(state => state.insertPremise);

    const insertAssumption = useFCSolution(state => state.insertAssumption);
    
    return <div className="w-full">

        {/* <Task/> */}

        {/* <UndoRedo/> */}

        {empty ? <LineWrapper>
        <div className="h-12"/>
            <Button icon={FiPlusCircle} onClick={() => insertPremise(0)}/>
            <Button icon={FiArrowRightCircle} onClick={() => insertAssumption(0, 1)}/>
        </LineWrapper> : <Lines/>}

    </div>
}

render(FCSolveView);