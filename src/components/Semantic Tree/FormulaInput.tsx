import React, { useState } from "react";

interface Props {
    initial_formula: string,
    name: string
}

const FormulaInput = ({initial_formula, name}: Props) => {

    const [formula, setFormula] = useState(initial_formula);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setFormula(e.target.value);
    }

    return <input name={name} value={formula} onChange={handleChange}/>

}

export default FormulaInput;