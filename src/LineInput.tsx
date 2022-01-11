import { none, State, useState } from "@hookstate/core";

interface Props {
    index: number
    state: State<number| undefined>
}

export default ({state: propState, index}: Props) => {

    const state = useState(propState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.value == "") {
            state.set(undefined);
            return;
        }

        const number = parseInt(e.target.value);

        if(number > 0 && number <= index) {
            state.set(number);
        }
    }

    return <input 
        className="h-12 bg-gray-100 w-16 text-center"
        required 
        aria-required
        value={state.value ?? ""}
        inputMode="numeric"
        onChange={handleChange}
    />
}