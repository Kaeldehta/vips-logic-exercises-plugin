import { FiArrowRightCircle, FiPlusCircle } from "react-icons/fi";
import Answer from "../../../../components/Answer";
import { useTypedSelector } from "../../../../hooks";
import { insertAssumption, insertPremise } from "../../../../redux/response/fc_exercise";
import Submit from "../../../../solve/Submit";
import LineWrapper from "../../LineWrapper";
import DispatchActionButton from "../../../../components/DispatchActionButton";
import Lines from "./Lines";

const Solve =  () => {

    const empty = useTypedSelector(state => state.response.ids.length == 0);

    if(empty) return <LineWrapper>
        <div className="h-12"/>
        <DispatchActionButton icon={FiPlusCircle} action={insertPremise({index: 0})}/>
        <DispatchActionButton icon={FiArrowRightCircle} action={insertAssumption({index: 0, indentation: 1})}/>
    </LineWrapper>

    return <div className="w-full">

        <Submit />

        <Answer separator={<>{"\u22A2"}<sub>FC</sub></>}/>

        <Lines />
    </div>
}

export default Solve;