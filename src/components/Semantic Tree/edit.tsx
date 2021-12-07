import {useState} from "react";

import FormulaInput from "./FormulaInput";

interface Props {
    consequence: string,
    statements: string[],
}

const EditComponent = ({consequence, statements}: Props) => {

    return <>
        <FormulaInput initial_formula={consequence} name="sem_cons"/>
    </>
}

export default EditComponent;