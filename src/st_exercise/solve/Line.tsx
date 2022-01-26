import { State, useState } from "@hookstate/core"
import FormulaInput from "../../FormulaInput";
import { useTask } from "../../utils";
import { Assumption, Falsum, Line, RuleApplication } from "../types"
import RuleSelect from "./RuleSelect";

interface Props {
    state: State<Line>
}

const isFalsum = (state: State<Falsum> | State<Assumption> | State<RuleApplication>): state is State<Falsum> => {
    return !(state as State<RuleApplication>).formula.ornull;
}

const isAssumption = (state: State<Assumption> | State<RuleApplication>): state is State<Assumption> => {
    return !(state as State<RuleApplication>).from.ornull;
}


const LineComponent = (props: Props) => {

    const state = useState(props.state) as State<Falsum> | State<Assumption> | State<RuleApplication>;

    const {predicateLogic} = useTask();

    if(isFalsum(state)) {
        return <div className="flex items-center gap-1">
            <div className="w-52">Falsum</div>
            <div className="w-20">L1</div>
            <div className="w-20">L2</div>
        </div>
    }

    if(isAssumption(state)) {
        return <div className="flex items-center gap-1">
            <FormulaInput allowPred={predicateLogic} state={state.formula}/><div className="w-40">Ass.</div>
        </div>
    }

    return <div className="flex items-center gap-1">
        <FormulaInput allowPred={predicateLogic} state={state.formula}/>
        <RuleSelect state={state.rule}/>
        <div className="w-20">Line</div>
    </div>
}

export default LineComponent;