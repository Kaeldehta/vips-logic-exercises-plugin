export const ELEMENT = document.getElementById('exercise-container') as HTMLElement;

const taskString = ELEMENT.dataset.task
const responseString = ELEMENT.dataset.response

export const TASK = taskString ? JSON.parse(taskString) : undefined

export const RESPONSE = responseString ? JSON.parse(responseString) : undefined

type TaskTypeType = "tree" | "fitch" | undefined
export const TASK_TYPE = ELEMENT.dataset.type as TaskTypeType;

type ViewType = "edit" | "solve" | "correct" | undefined
export const VIEW = ELEMENT.dataset.view as ViewType;
