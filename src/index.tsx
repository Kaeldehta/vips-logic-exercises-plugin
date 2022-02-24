import { Provider } from "react-redux";
import { render } from "react-dom";
import "./index.css";
import createStore from "./redux";
import React from "react";

const main = async () => {

    const element = document.getElementById("exercise-container");

    if(!element) throw new Error("Could not find element");

    const {view, type} = element.dataset;

    const store = await createStore();

    const {default: Component} = await import(`./exercises/${type}/views/${view}`);

    render(<Provider store={store}>
            <Component/>
    </Provider>, element);

}

main();