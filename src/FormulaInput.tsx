import { State, useState } from "@hookstate/core";
import { useEffect, useRef } from "react";
import { pathToPHPFormName } from "./utils";

interface Props {
    state: State<string>
}

const propositionalLogicChars = /[pqr12345789iklno\(\)]/

const predicateLogicChars = /[abcFGHxyzua]/

const finalPattern = "[\(\)pqr\u2192\u2194\u2227\u2228\u00AC\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089]+"

const FormulaInput = ({state: propState}: Props) => {

    const state = useState(propState);

    const cursor = useState(state.value.length);

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!ref.current) return;
        if(ref.current.selectionStart != cursor.value) {
            ref.current.setSelectionRange(cursor.value, cursor.value);
        }
    }, [cursor.value, ref.current, state.value])


    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        cursor.set(e.target.selectionStart!);

        let newFormula = e.target.value.replace(/i/g, "\u2192");
        newFormula = newFormula.replace(/o/g, "\u2194");
        newFormula = newFormula.replace(/k/g, "\u2227");
        newFormula = newFormula.replace(/l/g, "\u2228");
        newFormula = newFormula.replace(/n/g, "\u00AC");
        newFormula = newFormula.replace(/1/g, "\u2081");
        newFormula = newFormula.replace(/2/g, "\u2082");
        newFormula = newFormula.replace(/3/g, "\u2083");
        newFormula = newFormula.replace(/4/g, "\u2084");
        newFormula = newFormula.replace(/5/g, "\u2085");
        newFormula = newFormula.replace(/6/g, "\u2086");
        newFormula = newFormula.replace(/7/g, "\u2087");
        newFormula = newFormula.replace(/8/g, "\u2088");
        newFormula = newFormula.replace(/9/g, "\u2089");

        state.set(newFormula);
    }

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        
        if((e.key == "c" || e.key == "v" || e.key == "x") && (e.ctrlKey || e.metaKey)) return;
        
        if(!e.key.match(propositionalLogicChars) && !e.key.match(predicateLogicChars)) {
            e.preventDefault();
        }
    }

    return <>
        <input pattern={finalPattern} onKeyPress={handleKeyPress} ref={ref} onChange={handleChange} name={pathToPHPFormName(state.path)} className="bg-gray-100 w-52 h-12" required aria-required value={state.value}/>
    </>
}

export default FormulaInput;