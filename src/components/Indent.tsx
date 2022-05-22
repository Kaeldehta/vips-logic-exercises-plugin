import { Component, For, Index, Match, Switch } from "solid-js";
import { DeepReadonly } from "solid-js/store";
import { useFitchProof } from "../state/fitch";
import { FitchProofLine } from "../types";
import Border, { AssumptionBorder, LastPremiseBorder } from "./Border";

interface IndentProps {
    line: DeepReadonly<FitchProofLine>
    index: number
}

const Indent: Component<IndentProps> = (props) => {

    const [proof] = useFitchProof();

    const lastPremise = () => props.line.type === "prem" && (proof[props.index + 1]?.type !== "prem");

    return <Index each={Array(props.line.indentation + 1).fill(0)}>{
        (_, index) => <Switch fallback={<Border/>}>
            <Match when={props.line.type === "ass" && index == props.line.indentation}>
                <AssumptionBorder/>
            </Match>
            <Match when={lastPremise()}>
                <LastPremiseBorder/>
            </Match>
        </Switch>
    }</Index>
}

export default Indent;