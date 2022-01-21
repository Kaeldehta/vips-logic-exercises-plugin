import { State, useState } from "@hookstate/core";
import { nanoid } from "nanoid";
import { pathToPHPFormName } from "../../utils";
import { Branch, Node, Response } from "../types";
import LineComponent from "./Line";

interface Props {
    nodeState: State<Node>
}

const isBranch = (state: State<Node> | State<Branch>): state is State<Branch> => {
    return !!(state as State<Branch>).left.ornull;
}

interface RenderNextProps {
    state: State<Node["next"]>
}

const RenderNext = (props: RenderNextProps) => {
    
    const state = useState(props.state);

    const orNull = state.ornull;

    if(!orNull) return <div className="flex items-center">
        <button type="button" onClick={() => {
            state.set({id: nanoid(), line: {
                formula: ""
            }});
        }}>Ass</button>
        <button type="button" onClick={() => {
            state.set({id: nanoid(), line: {
                formula: "",
                from: {}
            }})
        }}>Rule</button>
        <button type="button" onClick={() => {
            state.set({
                left: {
                    id: nanoid(), 
                    line: {
                        formula: "",
                        from: {}
                    }
                },
                right: {
                    id: nanoid(), 
                    line: {
                        formula: "",
                        from: {}
                    }
                }   
            })
        }}>Branch</button>
        <button type="button">Falsum</button>
    </div>

    if(isBranch(orNull)) {
        return <div className="flex">
            <div className="flex flex-col gap-1 justify-start">
            <NodeComponent nodeState={orNull.right}/>
            </div>
            <div className="flex flex-col gap-1 justify-start">
            <NodeComponent nodeState={orNull.left}/>
            </div>
        </div>
    }

    return <NodeComponent nodeState={orNull}/>;

}

const NodeComponent = ({nodeState}: Props) => {

    const id = useState(nodeState.id);

    return <>
        <input type="hidden" name={pathToPHPFormName(id.path)} value={id.value}/>
        <LineComponent state={nodeState.line}/>
        <RenderNext state={nodeState.next}/>
    </>


}

export default NodeComponent;