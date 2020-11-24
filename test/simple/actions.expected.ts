// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/simple/redux.json, edit that file instead.

import { Action } from "redux";
import { deepFreeze } from "../utils";

export const SET_VALUE = "SIMPLE_SET_VALUE";
export const CLEAR_VALUE = "SIMPLE_CLEAR_VALUE";

export interface ISimpleSetValueAction extends Action<string> {
    type: typeof SET_VALUE;
    value: string;
}

export interface ISimpleClearValueAction extends Action<string> {
    type: typeof CLEAR_VALUE;
}

export type SimpleActions = ISimpleSetValueAction | ISimpleClearValueAction;

export function simpleSetValueAction(value: string): ISimpleSetValueAction {
    return Object.freeze({
        type: SET_VALUE,
        value,
    });
}

export function simpleClearValueAction(): ISimpleClearValueAction {
    return Object.freeze({
        type: CLEAR_VALUE,
    });
}

export type SimpleReducer<State> = (state: Readonly<State> | undefined, action: Readonly<SimpleActions>) => State;

export interface SimpleReducerCallbacks<State> {
    setValue: (state: Readonly<State>, value: string) => State;
    clearValue: (state: Readonly<State>) => State;
}

export function genSimpleReducer<State>(initialState: State, callbacks: SimpleReducerCallbacks<State>, freeze: (state: State) => State = deepFreeze): SimpleReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<SimpleActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case SET_VALUE:
                return freezeFunc(callbacks.setValue(state, action.value));
            case CLEAR_VALUE:
                return freezeFunc(callbacks.clearValue(state));
            default:
                return freezeFunc(state);
        }
    };
}
