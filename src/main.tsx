import 'vite/modulepreload-polyfill'
import { render } from "solid-js/web";
import './index.css'
import { ELEMENT, TASK_TYPE, VIEW } from './utils'

const run = async () => {
  if (!VIEW) {
    throw new Error("Can not determine view")
  }

  // const { default: ViewComponent } = VIEW === "edit" ? await import("./views/edit") : await import(`./views/${VIEW}/${TASK_TYPE}.tsx`)

  const { default: ViewComponent } = VIEW === "edit" ? await import("./views/edit") : await import(`./views/solve/fitch`)

  render(ViewComponent, ELEMENT);
}

run()


