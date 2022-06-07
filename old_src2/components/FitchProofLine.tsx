import { Component, createEffect, For, Index, Match, Show, Switch } from "solid-js";
import { Store, DeepReadonly } from "solid-js/store";
import { useFitchProof } from "../state/fitch";
import { FitchProofLine as FitchProofLineType, Formula as FormulaType, From } from "../types";
import Formula from "./Formula";
import FromSelect from "./FromSelect";
import Indent from "./Indent";
import Inserter from "./Inserter";

interface FitchProofLineProps {
    line: DeepReadonly<FitchProofLineType>
    index: number
}

const FitchProofLine: Component<FitchProofLineProps> = (props) => {

    const [, { setFormula, removeLine }] = useFitchProof();

    return <><div class="h-16 group min-w-fit flex justify-start gap-2 items-center">
        <div class="shrink-0 flex items-center w-12">{props.index + 1}</div>
        <Indent {...props} />
        <Show when={props.line.type !== "abs"} fallback={"\u22A5"}>
            <Formula allowPred={true} value={(props.line as FormulaType).formula} setValue={(value) => setFormula(props.index, value)} />
        </Show>
        <Show when={props.line.type === "rule"}>
            <select>
                <option hidden></option>
                <option value="test">2</option>
            </select>
        </Show>
        <Show when={props.line.type === "abs" || props.line.type === "rule"}>
            <Index each={(props.line as unknown as From).from}>{
                (from, i) => <FromSelect from={from()} index={i} lineIndex={props.index} />
            }</Index>
        </Show>
        <button type="button" onClick={() => removeLine(props.index)}>Remove</button>
    </div>
        <Inserter {...props} />
    </>
}

export default FitchProofLine;