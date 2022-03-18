import { LineId } from "../types";
import React from "react";
import { SolutionSelector, useAnySelector } from "../hooks";


const From = ({solutionSelector, id, fromRender: FromComponent}: {solutionSelector: SolutionSelector, id: LineId, fromRender: React.ComponentType<{id: LineId, index: number}>}) => {

    const fromLength = useAnySelector(state => solutionSelector(state).lines[id].from.length);

    return <>
    {Array(fromLength).fill(0).map((_, index) => <FromComponent key={index} id={id} index={index}/>)}
    </>

}

export default From;