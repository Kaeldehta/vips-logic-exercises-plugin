import { State, useState } from "@hookstate/core";
import { ChangeEvent } from "react";
import { pathToPHPFormName } from "./utils";

interface Props {
    state: State<string>
}

const replacementMap = {
    "i": "\u2192",
    "o": "\u2194",
    "k": "\u2227",
    "l": "\u2228",
    "n": "\u00AC",
    "p": "p",
    "q": "q",
    "r": "r",
    "(": "(",
    ")": ")",
}

const FormulaInput = ({state: propState}: Props) => {

    const state = useState(propState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        let newFormula = e.target.value;

        for(const [searchValue, replacement] of Object.entries(replacementMap)) {
            newFormula = newFormula.replaceAll(searchValue, replacement);
        }

        const remainingChars = Object.values(replacementMap).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, "[^") + "]";

        newFormula = newFormula.replaceAll(RegExp(remainingChars, "g"), "");

        state.set(newFormula);

        //e.target.setCustomValidity("I hate my life");
    }

    return <>
        <input name={pathToPHPFormName(state.path)} className="bg-gray-100 w-52 h-12" required aria-required value={state.value} onChange={handleChange}/>
    </>
}

export default FormulaInput;