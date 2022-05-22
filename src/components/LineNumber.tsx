import { State, useState } from "@hookstate/core";
import { Atom, useAtomValue } from "jotai";

interface LineNumberProps {
    indexAtom: Atom<number>
}

const LineNumber = ({indexAtom}: LineNumberProps) => {

    const index = useAtomValue(indexAtom)
    
    return <div className="shrink-0 flex items-center w-12">{index + 1}</div>
}

export default LineNumber;