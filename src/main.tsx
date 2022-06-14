import "vite/modulepreload-polyfill";
import { render } from "solid-js/web";
import "./index.css";
import { ELEMENT, TASK_TYPE, VIEW } from "./utils";
import { lazy } from "solid-js";

const ViewComponent = lazy(
  () =>
    (VIEW === "edit"
      ? import("./views/edit")
      : import(`./views/${VIEW}/${TASK_TYPE}.tsx`)) as Promise<{
      default: () => Element;
    }>
);

render(ViewComponent, ELEMENT);
