import {useState} from "react";

import FormulaInput from "./FormulaInput";

interface Props {
    semantic_consequence: string,
    statements: string[],
}

const EditComponent = ({semantic_consequence, statements}: Props) => {

    return <>
        <FormulaInput initial_formula={semantic_consequence} name="sem_cons"/>
    </>
}

export default EditComponent;