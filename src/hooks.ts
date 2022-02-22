import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux"
import type { Store } from "./types";

export const useTypedSelector: TypedUseSelectorHook<Store> = (selector) => useSelector(selector, shallowEqual);