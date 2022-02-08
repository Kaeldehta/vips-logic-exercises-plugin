import { Provider } from "react-redux";
import { render } from "react-dom";
import "./index.css";
import createStore from "./redux";

const main = async () => {

    const element = document.getElementById("exercise-container");

    const {view, type} = element.dataset;

    const store = await createStore();

    const {default: Component} = await import(`./exercises/${type}/views/${view}`);

    render(<Provider store={store}>
            <Component/>
    </Provider>, element);

}

main();