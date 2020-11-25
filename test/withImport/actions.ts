// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/withImport/redux.json, edit that file instead.

import { Action, deepFreeze } from "../utils";
import { NormalObject, OtherObject } from "./normal";
import DefaultObject from "./hasDefault";

export const PUBLISH_DEFAULT = "WITH_IMPORT_PUBLISH_DEFAULT";
export const PUBLISH_NORMAL = "WITH_IMPORT_PUBLISH_NORMAL";

export interface IWithImportPublishDefaultAction extends Action<string> {
    type: typeof PUBLISH_DEFAULT;
    def: DefaultObject;
    isDefault: boolean;
}

export interface IWithImportPublishNormalAction extends Action<string> {
    type: typeof PUBLISH_NORMAL;
    object: NormalObject;
    other: OtherObject;
}

export type WithImportActions = IWithImportPublishDefaultAction | IWithImportPublishNormalAction;

export function withImportPublishDefaultAction(def: DefaultObject, isDefault: boolean): IWithImportPublishDefaultAction {
    return Object.freeze({
        type: PUBLISH_DEFAULT,
        def,
        isDefault,
    });
}

export function withImportPublishNormalAction(object: NormalObject, other: OtherObject): IWithImportPublishNormalAction {
    return Object.freeze({
        type: PUBLISH_NORMAL,
        object,
        other,
    });
}

export type WithImportReducer<State> = (state: Readonly<State> | undefined, action: Readonly<WithImportActions>) => State;

export interface WithImportReducerCallbacks<State> {
    publishDefault: (state: Readonly<State>, def: DefaultObject, isDefault: boolean) => State;
    publishNormal: (state: Readonly<State>, object: NormalObject, other: OtherObject) => State;
}

export function genWithImportReducer<State>(initialState: State, callbacks: WithImportReducerCallbacks<State>, freeze: (state: State) => State = deepFreeze): WithImportReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<WithImportActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case PUBLISH_DEFAULT:
                return freezeFunc(callbacks.publishDefault(state, action.def, action.isDefault));
            case PUBLISH_NORMAL:
                return freezeFunc(callbacks.publishNormal(state, action.object, action.other));
            default:
                return freezeFunc(state);
        }
    };
}
