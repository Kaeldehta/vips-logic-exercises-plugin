import "vite/modulepreload-polyfill";
import { render } from "solid-js/web";
import "./index.css";
import { lazy } from "solid-js";
import { TaskType } from "./schemas/edit";
import { ELEMENT } from "./utils";

if (!ELEMENT) throw new Error("Could not find Root element");

const factory = () => {
  const viewName = VIEW === "edit" ? "edit" : (TASK as TaskType).type;
  return import(`./views/${viewName}.tsx`) as Promise<{
    default: () => Element;
  }>;
};

const ViewComponent = lazy(factory);

render(ViewComponent, ELEMENT);
