// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/reducer/redux.yml, edit that file instead.

import {
    genReducerReducer,
    reducerAdvancePageAction,
    reducerClearPageAction,
    reducerOtherActionAction,
    reducerSetBothPagesAction,
    reducerSetFirstPageAction,
    reducerSetOtherPageAction,
    reducerSetPageAction,
} from "./actions";
import { Dispatch } from "../utils";
import { PageNumber } from "./page-provider";

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

export interface ReducerStateProps {
    page: PageNumber | null;
    otherPage: PageNumber;
}

export function mapStateToProps(state: ReducerState): ReducerStateProps {
    return {
        page: state.page,
        otherPage: state.otherPage,
    };
}

export interface ReducerDispatchProps {
    setPage(page: PageNumber): void;
    clearPage(): void;
    setFirstPage(): void;
    advancePage(): void;
    setOtherPage(page: PageNumber): void;
    setBothPages(page: PageNumber, otherPage: PageNumber): void;
    otherAction(field: number): void;
}

export function mapDispatchToProps(dispatch: Dispatch): ReducerDispatchProps {
    return {
        setPage: (page: PageNumber): void => dispatch(reducerSetPageAction(page)),
        clearPage: (): void => dispatch(reducerClearPageAction()),
        setFirstPage: (): void => dispatch(reducerSetFirstPageAction()),
        advancePage: (): void => dispatch(reducerAdvancePageAction()),
        setOtherPage: (page: PageNumber): void => dispatch(reducerSetOtherPageAction(page)),
        setBothPages: (page: PageNumber, otherPage: PageNumber): void => dispatch(reducerSetBothPagesAction(page, otherPage)),
        otherAction: (field: number): void => dispatch(reducerOtherActionAction(field)),
    };
}
