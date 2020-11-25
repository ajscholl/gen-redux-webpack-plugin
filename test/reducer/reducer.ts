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
    setPage: (state, page: PageNumber) => ({
        ...state,
        page,
    }),
    clearPage: (state) => ({
        ...state,
        page: null,
    }),
    setFirstPage: (state) => ({
        ...state,
        page: 1,
    }),
    advancePage: (state) => ({
        ...state,
        page: (state.page || 0) + 1,
    }),
    setOtherPage: (state, page: PageNumber) => ({
        ...state,
        otherPage: page,
    }),
    setBothPages: (state, page: PageNumber, otherPage: PageNumber) => ({
        ...state,
        page,
        otherPage,
    }),
    otherAction: (state) => state,
});
