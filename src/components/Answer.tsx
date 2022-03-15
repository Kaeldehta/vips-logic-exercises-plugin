import type { ReactNode } from "react";
import { useTypedSelector } from "../hooks";
import { renderFormulaAsHTML } from "../utils";

interface Props {
    separator: ReactNode
}

const Answer = ({separator}: Props) => {

    const answer = useTypedSelector(state => state.answer);

    return <b className="flex gap-3 ml-10 mb-10 justify-start items-center">{Object.entries(answer.statements.entries).map(([id, statement], index) => <div key={id} className="flex items-center justify-start">{renderFormulaAsHTML(statement)}{index < answer.statements.ids.length - 1 && ","}</div>)}<div>{separator}</div><div className="flex items-center justify-start">{renderFormulaAsHTML(answer.consequence)}</div></b>

}

export default Answer;