import { useTypedSelector } from "../../../../hooks";
import Line from "./Line";
import React from "react";

const Lines = () => {

    const lineIds = useTypedSelector(state => state.response.ids);

    return <div>
        {lineIds.map((id) => <div key={id}>
            <Line id={id}/>
        </div>)}
    </div>

}

export default Lines;