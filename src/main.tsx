import "vite/modulepreload-polyfill";
import { render } from "solid-js/web";
import "./index.css";
import { lazy } from "solid-js";
import { TaskType } from "./schemas/edit";
import { ELEMENT } from "./utils";

if (!ELEMENT) throw new Error("Could not find Root element");

const factory = () => {
  if (VIEW === "edit") {
    return import("./views/edit");
  }
  if (!TASK) {
    throw new Error("Could not determine task");
  }
  return import(`./views/${VIEW}/${(TASK as TaskType).type}.tsx`) as Promise<{
    default: () => Element;
  }>;
};

const ViewComponent = lazy(factory);

render(ViewComponent, ELEMENT);
