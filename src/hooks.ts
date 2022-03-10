import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux"
import type { LineId, Store } from "./types";
import { isAbsurdity, isAssumption, isPremise, isRuleLine } from "./utils";

export const useTypedSelector: TypedUseSelectorHook<Store> = (selector) => useSelector(selector, shallowEqual);

export const useAssumptionState = (id: LineId) => useTypedSelector(state => isAssumption(state.response.present.lines[id]));

export const usePremiseState = (id: LineId) => useTypedSelector(state => isPremise(state.response.present.lines[id]));

export const useAbsurdityState = (id: LineId) => useTypedSelector(state => isAbsurdity(state.response.present.lines[id]));

export const useRuleLineState = (id: LineId) => useTypedSelector(state => isRuleLine(state.response.present.lines[id]));