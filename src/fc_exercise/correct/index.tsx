import {render} from "react-dom";
import {Absurdity, DisjunctionElim, isAssumption, isPremise, isRuleApplication, isSingleLineRule, isSingleLineRuleApplication, isTwoLineRuleApplication, Line, ProofLine as ProofLineType, Response, RuleApplication, Task, ValidRuleApplication} from "../domain";
import LineWrapper from "../LineWrapper";
import { options } from "../utils";
import "./index.css";

const ruleToLabel: Record<ValidRuleApplication["rule"],string>| {} = options.reduce((agg, option) => ({...agg, [option.value]: option.label}), {});

const Correct = ({lines}: {lines: ProofLineType[]}) => {

    const generateLine = (line: Line) => {

        if(isPremise(line)) {
            return <>
            <div className="w-52 flex items-center justify-start">{line.premise}</div>
            <div className="flex items-center">Prem.</div>
            </>
        }

        if(isAssumption(line)) {
            return <>
            <div className="w-52 flex items-center justify-start">{line.assumption}</div>
            <div className="flex items-center">Ass.</div>
            </>
        }

        if(isRuleApplication(line)) {

            let from: JSX.Element;

            if(isSingleLineRuleApplication(line)) {
                from = <>
                <div>{line.from.line + 1}</div>
                </>
            }
            else if(isTwoLineRuleApplication(line)) {
                from = <>
                <div>{line.from.line1 + 1}</div>
                <div>{line.from.line2 + 1}</div>
                </>
            }
            else {
                const narrowed = line as DisjunctionElim;
                from = <>
                <div>{narrowed.from.line + 1}</div>
                <div>{narrowed.from.assumption1 + 1}</div>
                <div>{narrowed.from.line1 + 1}</div>
                <div>{narrowed.from.assumption2 + 1}</div>
                <div>{narrowed.from.line2 + 1}</div>
                </>
            }

            return <>
            <div className="w-52 flex items-center justify-start">{line.formula}</div>
            <div>{ruleToLabel[line.rule]}</div>
            {from}
            </>;
        }

        return <>
        <div>{"\u22A5"}</div>
        <div>Abs.</div>
        <div>{line.from.line1}</div>
        <div>{line.from.line2}</div>
        </>
    }

    return <div>
    {lines.map((line, index) => <LineWrapper head={index + 1} addBottom={isAssumption(line.line)} reduceHeight={isAssumption(line.line)} height="h-12" indentationLevel={line.indentationLevel}>
        {generateLine(line.line)}
    </LineWrapper>)}
    </div>
}

const element = document.getElementById("exercise-container");

declare const REACT_PROPS: {response: Response, task: Task};

render(<Correct lines={REACT_PROPS.response.lines}/>, element);


