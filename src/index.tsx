import { Provider } from "react-redux";
import { render } from "react-dom";
import "./index.css";
import createStore from "./redux";

const main = async () => {

    const element = document.getElementById("exercise-container");

    if(!element) throw new Error("Could not find element");

    const {view, type} = element.dataset;

    const store = await createStore();

    //@ts-ignore
    const result = await import(`./exercises/*/views/*/index.tsx`);

    const {default: Component} = await result[type][view]();

    render(<Provider store={store}>
            <Component/>
    </Provider>, element);

}

main();