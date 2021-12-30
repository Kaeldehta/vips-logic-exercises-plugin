import {useState} from "react";
import FormulaInput from "../FormulaInput";
import RuleSelect, {Rule} from "./RuleSelect";

export interface Node {
    line: number,
    formula: string,

    from?: Rule

    left?: Node,
    right?: Node,

    form_prefix?: string,
    remove?: () => void,
}

const NodeComponent = (props: Node) => {

    const [formula, setFormula] = useState(props.formula);

    const [left, setLeft] = useState(props.left);

    const [right, setRight] = useState(props.right);

    return <div className="flex flex-col justify-start gap-2 self-start">
        <div className="self-center flex flex-row gap-2 items-center">
            <div>{props.line}</div>
            <FormulaInput formula={formula} setFormula={setFormula}/>
            <RuleSelect {...props.from?? {}} form_prefix={props.form_prefix + "[from]"}/>
            <input type="hidden" value={props.line} name={props.form_prefix + '[line]'}/>
        </div>
        
        <div className="flex flex-row gap-2">
        {left && <NodeComponent {...left} form_prefix={props.form_prefix + '[left]'} remove={() => setLeft(undefined)}/>}
        {right && <NodeComponent {...right} form_prefix={props.form_prefix + '[right]'} remove={() => setRight(undefined)}/>}
        </div>
        {!left && !right && 
        <div className="flex flex-row gap-2">
            <button className="hover:bg-gray-500 border-2 border-black px-2" onClick={(event) => {
                event.preventDefault();
                setLeft({formula: "", line: 2});
            }}>Add Line</button>
            <button className="hover:bg-gray-500 border-2 border-black px-2" onClick={(event) => {
                event.preventDefault();
                setLeft({formula: "", line: 2});
                setRight({formula: "", line: 2});
            }}>Branch</button>
        </div>}
        
    </div>

}

export default NodeComponent;