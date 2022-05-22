import { Component, createEffect, createSignal, For, onCleanup } from "solid-js"
import { createStore } from "solid-js/store";
import { useFitchProof } from "../state/fitch";
import FitchProofLine from "./FitchProofLine";


const FitchProof: Component = () => {

    const [proof, {insertPremise}] = useFitchProof();

    return <><For each={proof}>{
        (line, i) => <FitchProofLine line={line} index={i()}/>
    }</For>
    <button onClick={() => insertPremise(0)}>Add</button>
    </>
}

export default FitchProof;