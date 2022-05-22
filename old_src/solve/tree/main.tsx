import { useAtomValue, useSetAtom } from "jotai";
import render from "../../render";
import { ViewType } from "../../types";
import { rootAtom, startAtom } from "../atoms/tree";
import NodeComponent from "./Node";


const TreeSolveView: ViewType = () => {

    const root = useAtomValue(rootAtom);

    const start = useSetAtom(startAtom);

    return <div>
        {/* <Task/> */}
        {/* <UndoRedo /> */}
        <div className="pb-96 flex flex-col gap-1 justify-start items-center">
            {!root ? <button type="button" onClick={() => start()}>Start Proof</button> : <NodeComponent id={root}/>}
        </div>
    </div>
}

export default TreeSolveView;

render(TreeSolveView);