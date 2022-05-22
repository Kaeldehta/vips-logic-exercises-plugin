import { Component, createEffect, createSignal, For } from "solid-js";
import { useFitchProof } from "../state/fitch";

interface FromSelectProps {
    lineIndex: number
    index: number
    from: number
}

const FromSelect: Component<FromSelectProps> = (props) => {

    const [proof, {setFrom}] = useFitchProof();

    const [fromLine, setFromLine] = createSignal(proof[props.from]);

    const fromLineIndex = () => proof.indexOf(fromLine());

    createEffect(() => {
        setFrom(props.lineIndex, props.index, fromLineIndex());
    })

    return <select onChange={(e) => setFromLine(proof[parseInt(e.currentTarget.value)])}>
        <option selected={fromLineIndex() === -1} hidden></option>
        <For each={proof.slice(0, props.lineIndex)}>{
            (line, id) => <option selected={fromLineIndex() == id()} value={id()}>{id() + 1}</option>
        }</For>
    </select>

}

export default FromSelect;