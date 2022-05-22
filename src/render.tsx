import ReactDOM from "react-dom";
import React, { Suspense } from "react";
import { getElement } from "./utils";
import "./index.css"
import 'vite/modulepreload-polyfill'
import { ViewType } from "./types";

const render = (View: ViewType) => {

    const element = getElement();

    ReactDOM.render(
        <React.StrictMode>
            <Suspense fallback="Loading">
                <View/>
            </Suspense>
        </React.StrictMode>, 
        element
    )
}

export default render;
