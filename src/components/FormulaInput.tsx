import { ChangeEvent } from "react";

interface Props {
    useFormula: () => {formula: string, setFormula: (newFormula: string) => void}
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

const FormulaInput = ({useFormula}: Props) => {

    const {formula, setFormula} = useFormula();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        let newFormula = e.target.value;

        for(const [searchValue, replacement] of Object.entries(replacementMap)) {
            newFormula = newFormula.replaceAll(searchValue, replacement);
        }

        const remainingChars = Object.values(replacementMap).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, "[^") + "]";

        newFormula = newFormula.replaceAll(RegExp(remainingChars, "g"), "");

        setFormula(newFormula);

        //e.target.setCustomValidity("I hate my life");
    }

    return <input className="bg-gray-100 w-52 h-12" required aria-required value={formula} onChange={handleChange}/>

}

export default FormulaInput;