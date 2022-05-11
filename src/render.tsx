import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import { getElement } from "./utils";
import "./index.css"
import 'vite/modulepreload-polyfill'
import { ViewType } from "./types";

const render = (View: ViewType) => {

    const element = getElement();

    ReactDOM.createRoot(element).render(
        <React.StrictMode>
            <Suspense fallback="Loading">
                <View/>
            </Suspense>
        </React.StrictMode>
    )    
}

export default render;
