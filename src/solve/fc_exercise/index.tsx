import { FiArrowRightCircle, FiPlusCircle } from "react-icons/fi";
import Answer from "../../components/Answer";
import { useTypedSelector } from "../../hooks";
import { insertAssumption, insertPremise } from "../../redux/response/fc_exercise";
import Submit from "../../solve/Submit";
import LineWrapper from "../../components/LineWrapper";
import DispatchActionButton from "../../components/DispatchActionButton";
import Lines from "./Lines";
import UndoRedo from "../../components/UndoRedoHandler";

const Solve =  () => {

    const empty = useTypedSelector(state => state.response.present.ids.length == 0);

    return <div className="w-full">

        <Submit />

        <Answer separator={<>{"\u22A2"}<sub>FC</sub></>}/>

        <UndoRedo/>

        {empty ? <LineWrapper>
        <div className="h-12"/>
            <DispatchActionButton icon={FiPlusCircle} action={insertPremise({index: 0})}/>
            <DispatchActionButton icon={FiArrowRightCircle} action={insertAssumption({index: 0, indentation: 1})}/>
        </LineWrapper> : <Lines/>}

    </div>
}

export default Solve;