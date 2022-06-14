import "vite/modulepreload-polyfill";
import { render } from "solid-js/web";
import "./index.css";
import { ELEMENT, TASK_TYPE, VIEW } from "./utils";

const run = async () => {
  if (!VIEW) {
    throw new Error("Can not determine view");
  }

  const { default: ViewComponent } =
    VIEW === "edit"
      ? ((await import("./views/edit")) as { default: () => Element })
      : ((await import(`./views/${VIEW}/${TASK_TYPE ?? ""}.tsx`)) as {
          default: () => Element;
        });

  render(ViewComponent, ELEMENT);
};

void run();
