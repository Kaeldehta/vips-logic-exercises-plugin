import { Provider } from "react-redux";
import { render } from "react-dom";
import "./index.css";
import { Dataset, View } from "./types";

const getRenderElement = () => document.getElementById("exercise-container");

export const getViewData = () => {
    const element = getRenderElement();

    const {view, solution, task} = element.dataset as unknown as Dataset;

    const viewData: View = {
        view,
        task: task ? JSON.parse(task) : undefined,
        solution: solution ? JSON.parse(solution) : undefined,
    }

    return viewData;

}

const getComponentAndStore = async () => {

    const viewData = getViewData();

    if(viewData.view === "edit") {
        const {default: component, store} = await import("./edit");
        return {store, component};
    }

    const {default: component, store} = await import(/* webpackInclude: /(correct|solve)\/(fitch_calculus|semantic_tree)/ */`./${viewData.view}/${viewData.task.type}`);

    return {store, component};

}

const main = async () => {

    const element = getRenderElement();

    const {store, component: Component} = await getComponentAndStore();

    render(<Provider store={store}>
            <Component/>
    </Provider>, element);

}

main();