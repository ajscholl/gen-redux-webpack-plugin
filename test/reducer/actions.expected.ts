// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/reducer/redux.yml, edit that file instead.

import { Action, deepFreeze } from "../utils";
import { PageNumber } from "./page-provider";

export const SET_PAGE = "REDUCER_SET_PAGE";
export const CLEAR_PAGE = "REDUCER_CLEAR_PAGE";
export const SET_FIRST_PAGE = "REDUCER_SET_FIRST_PAGE";
export const ADVANCE_PAGE = "REDUCER_ADVANCE_PAGE";
export const SET_OTHER_PAGE = "REDUCER_SET_OTHER_PAGE";
export const SET_BOTH_PAGES = "REDUCER_SET_BOTH_PAGES";
export const OTHER_ACTION = "REDUCER_OTHER_ACTION";

export interface IReducerSetPageAction extends Action<string> {
    type: typeof SET_PAGE;
    page: PageNumber;
}

export interface IReducerClearPageAction extends Action<string> {
    type: typeof CLEAR_PAGE;
}

export interface IReducerSetFirstPageAction extends Action<string> {
    type: typeof SET_FIRST_PAGE;
}

export interface IReducerAdvancePageAction extends Action<string> {
    type: typeof ADVANCE_PAGE;
}

export interface IReducerSetOtherPageAction extends Action<string> {
    type: typeof SET_OTHER_PAGE;
    page: PageNumber;
}

export interface IReducerSetBothPagesAction extends Action<string> {
    type: typeof SET_BOTH_PAGES;
    page: PageNumber;
    otherPage: PageNumber;
}

export interface IReducerOtherActionAction extends Action<string> {
    type: typeof OTHER_ACTION;
    field: number;
}

export type ReducerActions =
    | IReducerSetPageAction
    | IReducerClearPageAction
    | IReducerSetFirstPageAction
    | IReducerAdvancePageAction
    | IReducerSetOtherPageAction
    | IReducerSetBothPagesAction
    | IReducerOtherActionAction;

export function reducerSetPageAction(page: PageNumber): IReducerSetPageAction {
    return Object.freeze({
        type: SET_PAGE,
        page,
    });
}

export function reducerClearPageAction(): IReducerClearPageAction {
    return Object.freeze({
        type: CLEAR_PAGE,
    });
}

export function reducerSetFirstPageAction(): IReducerSetFirstPageAction {
    return Object.freeze({
        type: SET_FIRST_PAGE,
    });
}

export function reducerAdvancePageAction(): IReducerAdvancePageAction {
    return Object.freeze({
        type: ADVANCE_PAGE,
    });
}

export function reducerSetOtherPageAction(page: PageNumber): IReducerSetOtherPageAction {
    return Object.freeze({
        type: SET_OTHER_PAGE,
        page,
    });
}

export function reducerSetBothPagesAction(page: PageNumber, otherPage: PageNumber): IReducerSetBothPagesAction {
    return Object.freeze({
        type: SET_BOTH_PAGES,
        page,
        otherPage,
    });
}

export function reducerOtherActionAction(field: number): IReducerOtherActionAction {
    return Object.freeze({
        type: OTHER_ACTION,
        field,
    });
}

export type ReducerReducer<State> = (state: Readonly<State> | undefined, action: Readonly<ReducerActions>) => State;

export interface ReducerReducerCallbacks<State> {
    setPage: (state: Readonly<State>, page: PageNumber) => State;
    clearPage: (state: Readonly<State>) => State;
    setFirstPage: (state: Readonly<State>) => State;
    advancePage: (state: Readonly<State>) => State;
    setOtherPage: (state: Readonly<State>, page: PageNumber) => State;
    setBothPages: (state: Readonly<State>, page: PageNumber, otherPage: PageNumber) => State;
    otherAction: (state: Readonly<State>, field: number) => State;
}

export function genReducerReducer<State>(initialState: State, callbacks: ReducerReducerCallbacks<State>, freeze: (state: State) => State = deepFreeze): ReducerReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<ReducerActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case SET_PAGE:
                return freezeFunc(callbacks.setPage(state, action.page));
            case CLEAR_PAGE:
                return freezeFunc(callbacks.clearPage(state));
            case SET_FIRST_PAGE:
                return freezeFunc(callbacks.setFirstPage(state));
            case ADVANCE_PAGE:
                return freezeFunc(callbacks.advancePage(state));
            case SET_OTHER_PAGE:
                return freezeFunc(callbacks.setOtherPage(state, action.page));
            case SET_BOTH_PAGES:
                return freezeFunc(callbacks.setBothPages(state, action.page, action.otherPage));
            case OTHER_ACTION:
                return freezeFunc(callbacks.otherAction(state, action.field));
            default:
                return freezeFunc(state);
        }
    };
}
