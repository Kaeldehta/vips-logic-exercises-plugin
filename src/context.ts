import { createContext, useContext } from "solid-js";
import { SetStoreFunction } from "solid-js/store";

export const StoreContext = createContext();

const useStoreContext = <T>() =>
  useContext<[T, SetStoreFunction<T>]>(StoreContext as never);

export default useStoreContext;
