// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/yaml/redux.yml, edit that file instead.

import { Action, deepFreeze } from "../utils";
import DefaultObject from "../withImport/hasDefault";

export const SET_DEFAULT = "YAML_SET_DEFAULT";

export interface IYamlSetDefaultAction extends Action<string> {
    type: typeof SET_DEFAULT;
    newDefault: DefaultObject;
}

export type YamlActions = IYamlSetDefaultAction;

export function yamlSetDefaultAction(newDefault: DefaultObject): IYamlSetDefaultAction {
    return Object.freeze({
        type: SET_DEFAULT,
        newDefault,
    });
}

export type YamlReducer<State> = (state: Readonly<State> | undefined, action: Readonly<YamlActions>) => State;

export interface YamlReducerCallbacks<State> {
    setDefault: (state: Readonly<State>, newDefault: DefaultObject) => State;
}

export function genYamlReducer<State>(initialState: State, callbacks: YamlReducerCallbacks<State>, freeze: (state: State) => State = deepFreeze): YamlReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<YamlActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case SET_DEFAULT:
                return freezeFunc(callbacks.setDefault(state, action.newDefault));
            default:
                return freezeFunc(state);
        }
    };
}
