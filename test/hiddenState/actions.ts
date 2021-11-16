// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/hiddenState/redux.yml, edit that file instead.

import { Action, deepFreeze } from "../utils";

export const INCREASE_COUNT = "HIDDEN_STATE_INCREASE_COUNT";

export interface IHiddenStateIncreaseCountAction extends Action<string> {
    type: typeof INCREASE_COUNT;
}

export type HiddenStateActions = IHiddenStateIncreaseCountAction;

export function hiddenStateIncreaseCountAction(): IHiddenStateIncreaseCountAction {
    return Object.freeze({
        type: INCREASE_COUNT,
    });
}

export type HiddenStateReducer<State> = (state: Readonly<State> | undefined, action: Readonly<HiddenStateActions>) => State;

export interface HiddenStateReducerCallbacks<State> {
    increaseCount: (state: Readonly<State>) => State;
}

export function genHiddenStateReducer<State>(
    initialState: State,
    callbacks: HiddenStateReducerCallbacks<State>,
    freeze: (state: State) => State = deepFreeze
): HiddenStateReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<HiddenStateActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case INCREASE_COUNT:
                return freezeFunc(callbacks.increaseCount(state));
            default:
                return freezeFunc(state);
        }
    };
}
