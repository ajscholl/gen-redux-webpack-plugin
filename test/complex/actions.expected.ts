// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/complex/redux.json, edit that file instead.

import { Action, deepFreeze } from "../utils";

export const SET_CALLBACK = "COMPLEX_SET_CALLBACK";
export const SET_MULTIPLE = "COMPLEX_SET_MULTIPLE";
export const MANY_ARGS = "COMPLEX_MANY_ARGS";
export const ACTION1 = "COMPLEX_ACTION1";
export const ACTION2 = "COMPLEX_ACTION2";
export const ACTION3 = "COMPLEX_ACTION3";
export const ACTION4 = "COMPLEX_ACTION4";
export const ACTION5 = "COMPLEX_ACTION5";
export const ACTION6 = "COMPLEX_ACTION6";
export const ACTION7 = "COMPLEX_ACTION7";
export const ACTION8 = "COMPLEX_ACTION8";
export const ACTION9 = "COMPLEX_ACTION9";

export interface IComplexSetCallbackAction extends Action<string> {
    type: typeof SET_CALLBACK;
    callback: () => void;
}

export interface IComplexSetMultipleAction extends Action<string> {
    type: typeof SET_MULTIPLE;
    choice: number | string;
}

export interface IComplexManyArgsAction extends Action<string> {
    type: typeof MANY_ARGS;
    arg1: number;
    arg2: number;
    arg3: number;
    arg4: number;
    arg5: number;
    arg6: number;
    arg7: number;
    arg8: number;
    arg9: number;
}

export interface IComplexAction1Action extends Action<string> {
    type: typeof ACTION1;
}

export interface IComplexAction2Action extends Action<string> {
    type: typeof ACTION2;
}

export interface IComplexAction3Action extends Action<string> {
    type: typeof ACTION3;
}

export interface IComplexAction4Action extends Action<string> {
    type: typeof ACTION4;
}

export interface IComplexAction5Action extends Action<string> {
    type: typeof ACTION5;
}

export interface IComplexAction6Action extends Action<string> {
    type: typeof ACTION6;
}

export interface IComplexAction7Action extends Action<string> {
    type: typeof ACTION7;
}

export interface IComplexAction8Action extends Action<string> {
    type: typeof ACTION8;
}

export interface IComplexAction9Action extends Action<string> {
    type: typeof ACTION9;
}

export type ComplexActions =
    | IComplexSetCallbackAction
    | IComplexSetMultipleAction
    | IComplexManyArgsAction
    | IComplexAction1Action
    | IComplexAction2Action
    | IComplexAction3Action
    | IComplexAction4Action
    | IComplexAction5Action
    | IComplexAction6Action
    | IComplexAction7Action
    | IComplexAction8Action
    | IComplexAction9Action;

export function complexSetCallbackAction(callback: () => void): IComplexSetCallbackAction {
    return Object.freeze({
        type: SET_CALLBACK,
        callback,
    });
}

export function complexSetMultipleAction(choice: number | string): IComplexSetMultipleAction {
    return Object.freeze({
        type: SET_MULTIPLE,
        choice,
    });
}

export function complexManyArgsAction(arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number, arg8: number, arg9: number): IComplexManyArgsAction {
    return Object.freeze({
        type: MANY_ARGS,
        arg1,
        arg2,
        arg3,
        arg4,
        arg5,
        arg6,
        arg7,
        arg8,
        arg9,
    });
}

export function complexAction1Action(): IComplexAction1Action {
    return Object.freeze({
        type: ACTION1,
    });
}

export function complexAction2Action(): IComplexAction2Action {
    return Object.freeze({
        type: ACTION2,
    });
}

export function complexAction3Action(): IComplexAction3Action {
    return Object.freeze({
        type: ACTION3,
    });
}

export function complexAction4Action(): IComplexAction4Action {
    return Object.freeze({
        type: ACTION4,
    });
}

export function complexAction5Action(): IComplexAction5Action {
    return Object.freeze({
        type: ACTION5,
    });
}

export function complexAction6Action(): IComplexAction6Action {
    return Object.freeze({
        type: ACTION6,
    });
}

export function complexAction7Action(): IComplexAction7Action {
    return Object.freeze({
        type: ACTION7,
    });
}

export function complexAction8Action(): IComplexAction8Action {
    return Object.freeze({
        type: ACTION8,
    });
}

export function complexAction9Action(): IComplexAction9Action {
    return Object.freeze({
        type: ACTION9,
    });
}

export type ComplexReducer<State> = (state: Readonly<State> | undefined, action: Readonly<ComplexActions>) => State;

export interface ComplexReducerCallbacks<State> {
    setCallback: (state: Readonly<State>, callback: () => void) => State;
    setMultiple: (state: Readonly<State>, choice: number | string) => State;
    manyArgs: (state: Readonly<State>, arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number, arg8: number, arg9: number) => State;
    action1: (state: Readonly<State>) => State;
    action2: (state: Readonly<State>) => State;
    action3: (state: Readonly<State>) => State;
    action4: (state: Readonly<State>) => State;
    action5: (state: Readonly<State>) => State;
    action6: (state: Readonly<State>) => State;
    action7: (state: Readonly<State>) => State;
    action8: (state: Readonly<State>) => State;
    action9: (state: Readonly<State>) => State;
}

export function genComplexReducer<State>(initialState: State, callbacks: ComplexReducerCallbacks<State>, freeze: (state: State) => State = deepFreeze): ComplexReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<ComplexActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case SET_CALLBACK:
                return freezeFunc(callbacks.setCallback(state, action.callback));
            case SET_MULTIPLE:
                return freezeFunc(callbacks.setMultiple(state, action.choice));
            case MANY_ARGS:
                return freezeFunc(callbacks.manyArgs(state, action.arg1, action.arg2, action.arg3, action.arg4, action.arg5, action.arg6, action.arg7, action.arg8, action.arg9));
            case ACTION1:
                return freezeFunc(callbacks.action1(state));
            case ACTION2:
                return freezeFunc(callbacks.action2(state));
            case ACTION3:
                return freezeFunc(callbacks.action3(state));
            case ACTION4:
                return freezeFunc(callbacks.action4(state));
            case ACTION5:
                return freezeFunc(callbacks.action5(state));
            case ACTION6:
                return freezeFunc(callbacks.action6(state));
            case ACTION7:
                return freezeFunc(callbacks.action7(state));
            case ACTION8:
                return freezeFunc(callbacks.action8(state));
            case ACTION9:
                return freezeFunc(callbacks.action9(state));
            default:
                return freezeFunc(state);
        }
    };
}
