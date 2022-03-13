import Node from "./Node";
import Answer from "../../components/Answer";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks";
import Submit from "../Submit";
import { start } from "../../redux/response/st_exercise";
import UndoRedo from "../../components/UndoRedoHandler";

const Solve = () => {

    const dispatch = useDispatch();

    const root = useTypedSelector(state => state.response.present.root);

    return <div>
            <Answer separator={"\u22A8"}/>
            <Submit />
            <UndoRedo />
            <div className="pb-96 flex flex-col gap-1 justify-start items-center">
                {!root ? <button type="button" onClick={() => dispatch(start())}>Start Proof</button> : <Node id={root}/>}
            </div>
        </div>
}

export default Solve;