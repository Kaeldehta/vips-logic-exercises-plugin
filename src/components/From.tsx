import React from "react";

interface FromProps {
    fromLength: number
    id: string
    fromRender: React.ComponentType<{id: string, index: number}>
}

const From = ({fromLength, id, fromRender: FromComponent}: FromProps) => {

    return <>
    {Array(fromLength).fill(0).map((_, index) => <FromComponent key={index} id={id} index={index}/>)}
    </>
}

export default From;