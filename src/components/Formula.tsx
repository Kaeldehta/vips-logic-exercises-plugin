import { ActionCreator, Selector } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks";
import { Store } from "../types";
import React from "react";

const propositionalLogicChars = /[pqr12345789iklno\(\)]/

const predicateLogicChars = /[abcFGHxyzue]/;

const finalPattern = "[\(\)pqr\u2192\u2194\u2227\u2228\u00AC\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089]+"

const finalPatternPred = "[\(\)pqrabcFGHxyz\u2192\u2194\u2227\u2228\u00AC\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089∀\u2203]+"

interface FormulaProps {
    selector: Selector<Store, string>
    actionCreator: ActionCreator<any>,
    allowPred?: true
}

const Formula = ({selector, actionCreator, allowPred: propsAllowPred}: FormulaProps) => {

    const value = useTypedSelector(selector);

    const allowPred = useTypedSelector(state => propsAllowPred?? state.answer.predicateLogic);

    const [cursor, setCursor] = useState(value.length);

    const ref = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!ref.current) return;
        if(ref.current.selectionStart != cursor) {
            ref.current.setSelectionRange(cursor, cursor);
        }
    }, [cursor, ref.current, value]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setCursor(e.target.selectionStart!);

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
        if(allowPred) {
            newFormula = newFormula.replace(/u/g, "∀");
            newFormula = newFormula.replace(/e/g, "\u2203");
        }
        dispatch(actionCreator(newFormula));
    }

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        
        if((e.key == "c" || e.key == "v" || e.key == "x") && (e.ctrlKey || e.metaKey)) return;
        
        if(!e.key.match(propositionalLogicChars) && (!allowPred || !e.key.match(predicateLogicChars))) {
            e.preventDefault();
        }
    }

    return <input 
        pattern={allowPred ? finalPatternPred : finalPattern}
        onKeyPress={handleKeyPress} 
        ref={ref}
        onChange={handleChange} 
        className="w-52 h-12 px-2 py-1" 
        required aria-required 
        value={value}
    />
}

export default Formula;