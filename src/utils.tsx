import { ReactNode } from "react";

export const ELEMENT = document.getElementById('exercise-container') as HTMLElement;

const taskString = ELEMENT.dataset.task
const responseString = ELEMENT.dataset.response

export const TASK = taskString ? JSON.parse(taskString) : undefined

export const RESPONSE = responseString ? JSON.parse(responseString) : undefined

type TaskTypeType = "tree" | "fitch" | undefined
export const TASK_TYPE = ELEMENT.dataset.type as TaskTypeType;

type ViewType = "edit" | "solve" | "correct" | undefined
export const VIEW = ELEMENT.dataset.view as ViewType;

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
  return Array.from(formula).map((c, index) => <div className="last:group-focus:text-red-500" key={index}>{charToHtml[c] ?? c}</div>)
}