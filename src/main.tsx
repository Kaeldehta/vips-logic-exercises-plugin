import 'vite/modulepreload-polyfill'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ELEMENT, TASK_TYPE, VIEW } from './utils'

const run = async () => {
  if (!VIEW) {
    throw new Error("Can not determine view")
  }

  const { default: ViewComponent } = VIEW === "edit" ? await import("./views/edit") : await import(`./views/${VIEW}/${TASK_TYPE}.tsx`)

  ReactDOM.createRoot(ELEMENT).render(
    <React.StrictMode>
      <ViewComponent />
    </React.StrictMode>
  )
}

run()


