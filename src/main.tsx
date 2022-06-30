import "vite/modulepreload-polyfill";
import { render } from "solid-js/web";
import "./index.css";
import { lazy } from "solid-js";
import { taskSchema } from "./schemas/edit";
import { ELEMENT } from "./utils";

if (!ELEMENT) throw new Error("Could not find Root element");

const factory = () => {
  const task = taskSchema.parse(TASK);
  let viewName = "edit";
  if (VIEW !== "edit") {
    if (!task) {
      throw new Error("Task is not defined");
    }
    viewName = task.type;
  }
  return import(`./views/${viewName}.tsx`) as Promise<{
    default: () => Element;
  }>;
};

const ViewComponent = lazy(factory);

render(ViewComponent, ELEMENT);
