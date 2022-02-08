import Node from "./Node";
import Answer from "../../../../components/Answer";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooks";
import Submit from "../../../../solve/Submit";
import { start } from "../../../../redux/response/st_exercise";

const Solve = () => {

    const dispatch = useDispatch();

    const empty = useTypedSelector(state => state.response.ids.length === 0);

    return <div className="w-full">
            <Answer separator={"\u22A8"}/>
            <Submit />
            <div className="flex flex-col gap-1">
                {empty ? <button type="button" onClick={() => dispatch(start())}>Start Proof</button> : <Node id="root"/>}
            </div>
        </div>
}

export default Solve;