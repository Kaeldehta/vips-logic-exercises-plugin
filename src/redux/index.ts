import { configureStore } from "@reduxjs/toolkit"
import answer from "./answer";
import createResponseReducer from "./response";
import undoable from "redux-undo";

const createStore = async () => {

    const response = await createResponseReducer();

    return configureStore({
        reducer: {
            answer,
            response: undoable(response),
        }
    });
}

export default createStore;