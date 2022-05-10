import { ReactNode } from "react";
import { Task } from "./types";

export const getElement = () => document.getElementById("root")!;

export const getView = () => getElement().dataset.view;

export const getTask = <T,>() => {
    const task = getElement().dataset.task;
    return task ? JSON.parse(task) as T : null;
}

export const getSolution = <T, >() => {
    const solution = getElement().dataset.solution;
    return solution ? JSON.parse(solution) as T : null;
}

export const charToHtml: Record<string, ReactNode> = {
    "i": <div className="mx-1">&rarr;</div>,
    "k": <div className="mx-1">&and;</div>,
    "l": <div className="mx-1">&or;</div>,
    "=": <div className="mx-1">=</div>,
    "n": <>&not;</>,
    "o": <div className="mx-1">&harr;</div>,
    "u": <>&forall;</>,
    "e": <>&exist;</>,
    "1": <sub>1</sub>,
    "2": <sub>2</sub>,
    "3": <sub>3</sub>,
    "4": <sub>4</sub>,
    "5": <sub>5</sub>,
    "6": <sub>6</sub>,
    "7": <sub>7</sub>,
    "8": <sub>8</sub>,
    "9": <sub>9</sub>,
}

export const renderFormulaAsHTML = (formula: string) => {
    return Array.from(formula).map((c, index) => <div className="last:group-focus:text-red-500" key={index}>{charToHtml[c]?? c}</div>)
}