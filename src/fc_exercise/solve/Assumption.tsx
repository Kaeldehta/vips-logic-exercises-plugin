import { State, useState } from "@hookstate/core";
import FormulaInput from "../../FormulaInput"
import { Assumption } from "../domain";

type Props = {
    state: State<Assumption>
}

export default ({state}: Props) => 
<>
    <FormulaInput state={state.assumption}/>
    <div className="flex items-center">Ass.</div>
</>

