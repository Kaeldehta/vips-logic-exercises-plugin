import { useTypedSelector } from "../hooks"
import React from "react";

const Submit = () => {

    const answer = useTypedSelector(state => state.answer);

    return <input name="answer" type="hidden" value={JSON.stringify(answer)}/>
}

export default Submit;