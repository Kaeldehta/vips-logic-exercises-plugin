import { Component, For, Index, Show } from "solid-js"
import { DeepReadonly } from "solid-js/store"
import { useFitchProof } from "../state/fitch"
import { FitchProofLine } from "../types"
import Border from "./Border"

interface InserterProps {
    line: DeepReadonly<FitchProofLine>
    index: number
}

const Inserter: Component<InserterProps> = (props) => {

    const [proof, {
        insertAbsurdity,
        insertAssumption,
        insertPremise,
        insertRuleLine
    }] = useFitchProof();

    // Don't track indentation cause it can't change
    const indentation = props.line.indentation;

    // Don't track premise state
    const premise = props.line.type === "prem";

    const next = () => proof[props.index + 1]

    const lastPremise = () => premise && (next()?.type !== "prem")

    // Track indentationDelta
    const indentationDelta = () => {

        const nextLine = next()

        if (nextLine) {

            const nextIndentation = nextLine.indentation;

            if (nextLine.type === "ass") {
                if (nextIndentation > indentation) return 0;

                return -indentation;
            }

            return nextIndentation - indentation;
        }

        return -indentation;
    }

    return <>
        <For each={Array(-Math.min(indentationDelta(), 0) + 1).fill(0)}>{
            (_, indentationOffset) => {

                const newIndentation = () => indentation - indentationOffset();

                return <div class="h-16 group min-w-fit flex justify-start gap-2 items-center">
                    <div class="w-12" />
                    <Index each={Array(newIndentation() + 1).fill(0)}>{
                        () => <Border />
                    }</Index>
                    <div class="w-52 border-2 p-1 border-white border-solid flex justify-evenly">
                        <Show when={!premise || lastPremise()}>
                            <button type="button" onClick={() => insertAssumption(props.index + 1, newIndentation() + 1)}>Ass</button>
                            <button type="button" onClick={() => insertAbsurdity(props.index + 1, newIndentation())}>Abs</button>
                            <button type="button" onClick={() => insertRuleLine(props.index + 1, newIndentation())}>RuleLine</button>
                        </Show>
                        <Show when={premise}>
                            <button type="button" onClick={() => insertPremise(props.index + 1)}>Prem</button>
                        </Show>
                    </div>
                </div>
            }
        }</For>
    </>
}

export default Inserter;