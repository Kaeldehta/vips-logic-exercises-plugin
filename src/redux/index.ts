import { configureStore } from "@reduxjs/toolkit"
import answer from "./answer";
import createResponseReducer from "./response";

const createStore = async () => {

    const response = await createResponseReducer();

    return configureStore({
        reducer: {
            answer: answer,
            response: response
        }
    });
}

export default createStore;