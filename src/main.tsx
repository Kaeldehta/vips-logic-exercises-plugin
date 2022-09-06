import "vite/modulepreload-polyfill";
import { render } from "solid-js/web";
import "./index.css";
import { Component, lazy } from "solid-js";
import { ELEMENT } from "./utils";
import { Schema } from "zod";
import { StoreContext } from "./context";
import storeFactory from "./storeFactory";

const run = async () => {
  if (!ELEMENT) throw new Error("Could not find Root element");

  let viewName = "edit";
  if (VIEW !== "edit") {
    if (!TASK_TYPE) {
      throw new Error("Task is not defined");
    }
    viewName = TASK_TYPE;
  }

  const { default: schema } = (await import(`./schemas/${viewName}.ts`)) as {
    default: Schema;
  };

  const ViewComponent = lazy(
    () => import(`./views/${viewName}.tsx`) as Promise<{ default: Component }>
  );

  const store = storeFactory(VIEW === "edit" ? TASK : RESPONSE, schema);

  const code = () => (
    <StoreContext.Provider value={store}>
      <ViewComponent />
    </StoreContext.Provider>
  );

  render(code, ELEMENT);
};

run()
  .then(() => {
    console.log("App is ready");
  })
  .catch((err) => {
    console.error(err);
  });
