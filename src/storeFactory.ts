import { createStore } from "solid-js/store";

const storeFactory = <T>(initialValues: T) => {
  return createStore(initialValues);
};

export default storeFactory;
