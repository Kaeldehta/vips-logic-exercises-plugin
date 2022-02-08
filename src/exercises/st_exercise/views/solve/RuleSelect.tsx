import Select from "react-select";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooks";
import { setRule } from "../../../../redux/response";
import { LineId } from "../../../../types";
import { propRulesOptions } from "../../types";

const RuleSelect = ({id}: {id: LineId}) => {

    const rule = useTypedSelector(state => state.response.lines[id].rule);

    const {formulaUndefined, fromUndefined} = useTypedSelector(state => {
        const node = state.response.lines[id]
        const formulaUndefined = node.formula === undefined;
        const fromUndefined = node.from === undefined;

        return {formulaUndefined, fromUndefined: fromUndefined};
    });

    //const predicateLogic = useTypedSelector(state => state.task.answers[0].predicateLogic);

    const dispatch = useDispatch();

    console.log("Rerender Rule Select: ", id);

    if(fromUndefined) return <div className="w-36">Ass</div>

    if(formulaUndefined) return <div className="w-36"/>

    return <Select
        className="w-36"
        options={propRulesOptions}
        value={propRulesOptions.find(o => o.value === rule) ?? null}
        onChange={(o) => dispatch(setRule({lineId: id, rule: o.value}))}
    />
}

export default RuleSelect