import { TaskType } from "./schemas/edit";
import { FitchProofType, SemanticTreeType } from "./schemas/solve";

export const ELEMENT = document.getElementById(
  "exercise-container"
) as HTMLElement;

const taskString = ELEMENT.dataset.task;
const responseString = ELEMENT.dataset.response;

export const TASK = taskString
  ? (JSON.parse(taskString) as TaskType)
  : undefined;

export const RESPONSE = responseString
  ? (JSON.parse(responseString) as FitchProofType | SemanticTreeType)
  : undefined;

type TaskTypeType = "tree" | "fitch" | undefined;
export const TASK_TYPE = ELEMENT.dataset.type as TaskTypeType;

type ViewType = "edit" | "solve" | "correct" | undefined;
export const VIEW = ELEMENT.dataset.view as ViewType;
