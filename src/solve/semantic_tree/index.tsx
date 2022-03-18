import Node from "./Node";
import { useDispatch } from "react-redux";
import Submit from "../Submit";
import UndoRedo from "../UndoRedoHandler";
import Task from "../../components/Task";
import { start, useTypedSelector } from "./redux";

const Solve = () => {

    const dispatch = useDispatch();

    const root = useTypedSelector(state => state.solution.present.root);

    return <div>
            <Task/>
            <Submit />
            <UndoRedo />
            <div className="pb-96 flex flex-col gap-1 justify-start items-center">
                {!root ? <button type="button" onClick={() => dispatch(start())}>Start Proof</button> : <Node id={root}/>}
            </div>
        </div>
}

export default Solve;