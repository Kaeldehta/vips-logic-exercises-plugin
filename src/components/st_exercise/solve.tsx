import NodeComponent, {Node} from "./Node";
import {useState} from "react";

interface SolveCompomentProps {
    consequence: string,
    statements?: string[],
    root?: Node
}


const SolveComponent = (props: SolveCompomentProps) => {

    const [root, setRoot] = useState(props.root);

    return <div>
        <b>
            {props.statements?.join(", ")}
            {" \u22A8 "}
            {props.consequence}
        </b>
        <div className="flex justify-start">
        {root ? <NodeComponent {...root} form_prefix="root" remove={() => setRoot(undefined)}/> : 
        <button onClick={(event) => {
            event.preventDefault();
            setRoot({formula: "", line: 1});
        }}>Add Line</button>
        }
        </div>
    </div>
}

export default SolveComponent;