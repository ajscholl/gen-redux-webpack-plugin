// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/reducer/redux.yml, edit that file instead.

import { PageNumber } from "./page-provider";
import { genReducerReducer } from "./actions";

export interface ReducerState {
    page: PageNumber | null;
    otherPage: PageNumber;
}

const initialState: ReducerState = {
    page: null,
    otherPage: 0,
};

export const reducerReducer = genReducerReducer(initialState, {
    setPage: (state: ReducerState, page: PageNumber): ReducerState => ({
        ...state,
        page,
    }),
    clearPage: (state: ReducerState): ReducerState => ({
        ...state,
        page: null,
    }),
    setFirstPage: (state: ReducerState): ReducerState => ({
        ...state,
        page: 1,
    }),
    advancePage: (state: ReducerState): ReducerState => ({
        ...state,
        page: (state.page || 0) + 1,
    }),
    setOtherPage: (state: ReducerState, page: PageNumber): ReducerState => ({
        ...state,
        otherPage: page,
    }),
    setBothPages: (state: ReducerState, page: PageNumber, otherPage: PageNumber): ReducerState => ({
        ...state,
        page,
        otherPage,
    }),
    otherAction: (state: ReducerState): ReducerState => state,
});
