import { Provider } from "react-redux";
import { render } from "react-dom";
import "./index.css";
import createStore from "./redux";

const main = async () => {

    const element = document.getElementById("exercise-container");

    if(!element) throw new Error("Could not find element");

    const {view, type} = element.dataset;

    const store = await createStore();

    const {default: Component} = await import(/* webpackInclude: /(solve|edit|correct)\/(st_exercise|fc_exercise)/ */`./${view}/${type}`);

    render(<Provider store={store}>
            <Component/>
    </Provider>, element);

}

main();