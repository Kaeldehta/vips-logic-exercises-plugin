import { useTypedSelector } from "../hooks"
import React from "react";

const Submit = () => {

    const response = useTypedSelector(state => state.response);

    return <input name="response" type="hidden" value={JSON.stringify(response)}/>
}

export default Submit;