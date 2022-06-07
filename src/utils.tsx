import { ReactNode } from "react";

export const ELEMENT = document.getElementById('exercise-container') as HTMLElement;

const taskString = ELEMENT.dataset.task

export const TASK = taskString ? JSON.parse(taskString) : undefined

type TaskTypeType = "tree" | "fitch" | undefined
export const TASK_TYPE = ELEMENT.dataset.type as TaskTypeType;

type ViewType = "edit" | "solve" | "correct" | undefined
export const VIEW = ELEMENT.dataset.view as ViewType;

export const createSyntheticEvent = <T extends Element, E extends Event>(event: E): React.SyntheticEvent<T, E> => {
  let isDefaultPrevented = false;
  let isPropagationStopped = false;
  const preventDefault = () => {
    isDefaultPrevented = true;
    event.preventDefault();
  }
  const stopPropagation = () => {
    isPropagationStopped = true;
    event.stopPropagation();
  }
  return {
    nativeEvent: event,
    currentTarget: event.currentTarget as EventTarget & T,
    target: event.target as EventTarget & T,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    preventDefault,
    isDefaultPrevented: () => isDefaultPrevented,
    stopPropagation,
    isPropagationStopped: () => isPropagationStopped,
    persist: () => {
      isDefaultPrevented = false;
      isPropagationStopped = false;
    },
    timeStamp: event.timeStamp,
    type: event.type,
  };
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
  return Array.from(formula).map((c, index) => <div className="last:group-focus:text-red-500" key={index}>{charToHtml[c] ?? c}</div>)
}