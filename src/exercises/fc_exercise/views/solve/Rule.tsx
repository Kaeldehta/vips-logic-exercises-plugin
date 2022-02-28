import { useTypedSelector } from "../../../../hooks";
import { LineId } from "../../../../types";

const Rule = ({id}: {id: LineId}) => {

    const isRuleLine = useTypedSelector(state => state.response.lines[id].rule !== undefined);


}