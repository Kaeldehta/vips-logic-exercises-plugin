import Formula from "../components/Formula";
import { useTypedSelector } from "../hooks";
import { setStatement } from "../redux/answer";
import React from "react";

const Statements = () => {

    const statements = useTypedSelector(state => state.answer.statements.ids);

    return <>
        {statements.map((id) => <Formula allowPred selector={state => state.answer.statements[id].formula} actionCreator={(statement: string) => setStatement({id, statement})}/>)}
    </>
}

export default Statements;