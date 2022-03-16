import { useTypedSelector } from "../hooks";
import { LineId } from "../types";
import React from "react";


const From = ({id, fromRender: FromComponent}: {id: LineId, fromRender: React.ComponentType<{id: LineId, index: number}>}) => {

    const fromLength = useTypedSelector(state => state.response.present.lines[id].from.length)

    return <>
    {Array(fromLength).fill(0).map((_, index) => <FromComponent key={index} id={id} index={index}/>)}
    </>

}

export default From;