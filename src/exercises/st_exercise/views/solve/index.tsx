import Node from "./Node";
import Answer from "../../../../components/Answer";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooks";
import Submit from "../../../../solve/Submit";
import { start } from "../../../../redux/response/st_exercise";

const Solve = () => {

    const dispatch = useDispatch();

    const empty = useTypedSelector(state => state.response.present.ids.length === 0);

    return <div>
            <Answer separator={"\u22A8"}/>
            <Submit />
            <div className="pb-96 flex flex-col gap-1 justify-start items-center">
                {empty ? <button type="button" onClick={() => dispatch(start())}>Start Proof</button> : <Node id="root"/>}
            </div>
        </div>
}

export default Solve;