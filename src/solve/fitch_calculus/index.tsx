import { FiArrowRightCircle, FiPlusCircle } from "react-icons/fi";
import Submit from "../Submit";
import LineWrapper from "../../components/LineWrapper";
import DispatchActionButton from "../../components/DispatchActionButton";
import Lines from "./Lines";
import UndoRedo from "../UndoRedoHandler";
import Task from "../../components/Task";
import { insertPremise, insertAssumption, useTypedSelector } from "./redux";

const Solve =  () => {

    const empty = useTypedSelector(state => state.solution.present.ids.length == 0);

    return <div className="w-full">

        <Submit />

        <Task/>

        <UndoRedo/>

        {empty ? <LineWrapper>
        <div className="h-12"/>
            <DispatchActionButton icon={FiPlusCircle} action={insertPremise({index: 0})}/>
            <DispatchActionButton icon={FiArrowRightCircle} action={insertAssumption({index: 0, indentation: 1})}/>
        </LineWrapper> : <Lines/>}

    </div>
}

export default Solve;

export {default as store} from "./redux"