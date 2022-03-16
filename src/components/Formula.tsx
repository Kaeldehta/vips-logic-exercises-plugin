import { ActionCreator, Selector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks";
import { Store } from "../types";
import { renderFormulaAsHTML } from "../utils";

const propositionalLogicChars = /^[pqr12345789iklno\(\)]$/

const predicateLogicChars = /^[abcFGHxyzue]$/;

interface FormulaProps {
    selector: Selector<Store, string>
    actionCreator: ActionCreator<any>,
    allowPred?: true
}

const Formula = ({selector, actionCreator, allowPred: propsAllowPred}: FormulaProps) => {

    const value = useTypedSelector(selector);

    const allowPred = useTypedSelector(state => propsAllowPred?? state.answer.predicateLogic);

    const dispatch = useDispatch();

    return <div
    className="w-52 min-w-fit h-12 px-2 py-1 border-solid flex items-center justify-start cursor-pointer focus:outline-none focus:bg-gray-200"
    tabIndex={0}
    onCopy={(e) => {
        e.preventDefault()
        console.log(e)
    }}
    onKeyPress={e => {
        if(e.key.match(propositionalLogicChars) || (allowPred && e.key.match(predicateLogicChars))) {
            dispatch(actionCreator(value + e.key))
        }
    }}
    onKeyDown={e => {
        if(e.key === "Backspace") {
            dispatch(actionCreator(value.slice(0, -1)))
        }
    }}
    >
    {renderFormulaAsHTML(value)}
    </div>
}

export default Formula;