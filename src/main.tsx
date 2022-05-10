import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import View from "./View";
import { getElement } from "./utils";
import "./index.css"
import 'vite/modulepreload-polyfill'

const element = getElement();

ReactDOM.createRoot(element).render(
    <React.StrictMode>
        <Suspense fallback="Loading">
            <View/>
        </Suspense>
    </React.StrictMode>
) 