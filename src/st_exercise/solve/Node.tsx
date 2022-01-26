import { none, State, useState } from "@hookstate/core";
import { nanoid } from "nanoid";
import { pathToPHPFormName } from "../../utils";
import { Node, Response } from "../types";
import LineComponent from "./Line";

interface Props {
    nodeState: State<Node>
}

interface RenderNextProps {
    state: State<Node>
}

const RenderNext = (props: RenderNextProps) => {

    const right = useState(props.state.right).ornull;

    const left = useState(props.state.left).ornull;

    if(!right && !left) return <div className="flex items-center">
        <button type="button" onClick={() => {
            props.state.left.set({id: nanoid(), line: {
                formula: ""
            }});
        }}>Ass</button>
        <button type="button" onClick={() => {
            props.state.left.set({id: nanoid(), line: {
                formula: "",
                from: {}
            }})
        }}>Rule</button>
        <button type="button" onClick={() => {
            props.state.left.set({
                id: nanoid(),
                line: {
                    formula: "",
                    from: {}
                }
            })
            props.state.right.set({
                id: nanoid(),
                line: {
                    formula: "",
                    from: {}
                }
            })
        }}>Branch</button>
        <button type="button">Falsum</button>
    </div>

    return <div className="flex">
        
        {right && <div className="flex flex-col gap-1 justify-start">
        <NodeComponent nodeState={right}/>
        </div> }
        {left && <div className="flex flex-col gap-1 justify-start">
        <NodeComponent nodeState={left}/>
        </div> }
        </div>
}

const NodeComponent = ({nodeState}: Props) => {

    const id = useState(nodeState.id);

    return <>
        <input type="hidden" name={pathToPHPFormName(id.path)} value={id.value}/>
        <LineComponent state={nodeState.line}/>
        <button type="button" onClick={() => {
            nodeState.set(none);
        }}>Remove</button>
        <RenderNext state={nodeState}/>
    </>


}

export default NodeComponent;