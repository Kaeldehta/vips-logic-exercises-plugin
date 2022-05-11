import useTreeSolution from "../../stores/tree";
import { ViewType } from "../../types";
import NodeComponent from "./Node";


const TreeSolveView: ViewType = () => {

    const root = useTreeSolution(state => state.root);

    const start = useTreeSolution(state => state.start);

    return <div>
        {/* <Task/> */}
        {/* <UndoRedo /> */}
        <div className="pb-96 flex flex-col gap-1 justify-start items-center">
            {!root ? <button type="button" onClick={() => start()}>Start Proof</button> : <NodeComponent id={root}/>}
        </div>
    </div>
}

export default TreeSolveView;