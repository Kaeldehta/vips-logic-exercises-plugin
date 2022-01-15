import { State, useState } from "@hookstate/core";
import { useEffect, useRef } from "react";
import { pathToPHPFormName } from "../../utils";
import { ProofLine } from "../domain";

interface Props {
    state: State<number | undefined>
    linesState: State<ProofLine[]>
}

export default (props: Props) => {

    const state = useState(props.state);
    const linesState = useState(props.linesState);

    const inputState = useState<number| string>("");

    const selectedLineId = useState(state.value !== undefined ? linesState[state.value].id.value : undefined);

    useEffect(() => {
        const find = linesState.findIndex(({id}) => id.value == selectedLineId.value);
        if(find == -1) {
            state.set(undefined);
            inputState.set("");
        }else {
            state.set(find);
            inputState.set(find + 1);
        }
        
    }, [linesState.length]);

    useEffect(() => {
        if(state.value === undefined) {
            inputState.set("");
            selectedLineId.set(undefined);
        }

    }, [state.value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.value == "") {
            state.set(undefined);
            selectedLineId.set(undefined);
            inputState.set("");
            return;
        }

        const number = parseInt(e.target.value);

        if(number > 0 && number <= state.path[1]) {
            state.set(number - 1);
            selectedLineId.set(linesState[number - 1].id.value);
            inputState.set(number);
        }

    }

    return <><input 
        className="h-12 bg-gray-100 w-16 text-center"
        inputMode="numeric"
        required 
        aria-required
        value={inputState.value}
        onChange={handleChange}
    />
    {state.ornull && <input type="hidden" name={pathToPHPFormName(state.path)} value={state.value}/> }
    </>

}