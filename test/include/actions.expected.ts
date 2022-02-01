// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/include/redux.yml, edit that file instead.

import { Action, deepFreeze } from "../utils";
import { Todo } from "../todoApp/types";

export const ADD_TODO = "INCLUDE_ADD_TODO";
export const ADD_TWO_TODOS = "INCLUDE_ADD_TWO_TODOS";
export const SET_TODOS = "INCLUDE_SET_TODOS";
export const REMOVE_TODO = "INCLUDE_REMOVE_TODO";
export const CLEAR_TODOS = "INCLUDE_CLEAR_TODOS";
export const HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT = "HIDDEN_STATE___INCLUDE_HIDDEN_STATE_INCREASE_COUNT";
export const ANOTHER_HIDDEN_STATE___INCREASE_COUNT = "ANOTHER_HIDDEN_STATE___INCLUDE_INCREASE_COUNT";
export const INDIRECT_HIDDEN_STATE__NESTED___INCREASE_COUNT = "INDIRECT_HIDDEN_STATE__NESTED___INCLUDE_INCREASE_COUNT";
export const A_LAST_HIDDEN_STATE___INCREASE_COUNT = "A_LAST_HIDDEN_STATE___INCLUDE_INCREASE_COUNT";

export interface IIncludeAddTodoAction extends Action<string> {
    type: typeof ADD_TODO;
    todo: Todo;
}

export interface IIncludeAddTwoTodosAction extends Action<string> {
    type: typeof ADD_TWO_TODOS;
    firstTodo: Todo;
    secondTodo: Todo;
}

export interface IIncludeSetTodosAction extends Action<string> {
    type: typeof SET_TODOS;
    todos: Todo[];
}

export interface IIncludeRemoveTodoAction extends Action<string> {
    type: typeof REMOVE_TODO;
    todo: Todo;
}

export interface IIncludeClearTodosAction extends Action<string> {
    type: typeof CLEAR_TODOS;
}

export interface IHiddenState__IncludeHiddenStateIncreaseCountAction extends Action<string> {
    type: typeof HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT;
}

export interface IAnotherHiddenState__IncludeIncreaseCountAction extends Action<string> {
    type: typeof ANOTHER_HIDDEN_STATE___INCREASE_COUNT;
}

export interface IIndirectHiddenState_Nested__IncludeIncreaseCountAction extends Action<string> {
    type: typeof INDIRECT_HIDDEN_STATE__NESTED___INCREASE_COUNT;
}

export interface IALastHiddenState__IncludeIncreaseCountAction extends Action<string> {
    type: typeof A_LAST_HIDDEN_STATE___INCREASE_COUNT;
}

export type IncludeActions =
    | IIncludeAddTodoAction
    | IIncludeAddTwoTodosAction
    | IIncludeSetTodosAction
    | IIncludeRemoveTodoAction
    | IIncludeClearTodosAction
    | IHiddenState__IncludeHiddenStateIncreaseCountAction
    | IAnotherHiddenState__IncludeIncreaseCountAction
    | IIndirectHiddenState_Nested__IncludeIncreaseCountAction
    | IALastHiddenState__IncludeIncreaseCountAction;

export function includeAddTodoAction(todo: Todo): IIncludeAddTodoAction {
    return Object.freeze({
        type: ADD_TODO,
        todo,
    });
}

export function includeAddTwoTodosAction(firstTodo: Todo, secondTodo: Todo): IIncludeAddTwoTodosAction {
    return Object.freeze({
        type: ADD_TWO_TODOS,
        firstTodo,
        secondTodo,
    });
}

export function includeSetTodosAction(todos: Todo[]): IIncludeSetTodosAction {
    return Object.freeze({
        type: SET_TODOS,
        todos,
    });
}

export function includeRemoveTodoAction(todo: Todo): IIncludeRemoveTodoAction {
    return Object.freeze({
        type: REMOVE_TODO,
        todo,
    });
}

export function includeClearTodosAction(): IIncludeClearTodosAction {
    return Object.freeze({
        type: CLEAR_TODOS,
    });
}

export function hiddenState__IncludeHiddenStateIncreaseCountAction(): IHiddenState__IncludeHiddenStateIncreaseCountAction {
    return Object.freeze({
        type: HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT,
    });
}

export function anotherHiddenState__IncludeIncreaseCountAction(): IAnotherHiddenState__IncludeIncreaseCountAction {
    return Object.freeze({
        type: ANOTHER_HIDDEN_STATE___INCREASE_COUNT,
    });
}

export function indirectHiddenState_Nested__IncludeIncreaseCountAction(): IIndirectHiddenState_Nested__IncludeIncreaseCountAction {
    return Object.freeze({
        type: INDIRECT_HIDDEN_STATE__NESTED___INCREASE_COUNT,
    });
}

export function aLastHiddenState__IncludeIncreaseCountAction(): IALastHiddenState__IncludeIncreaseCountAction {
    return Object.freeze({
        type: A_LAST_HIDDEN_STATE___INCREASE_COUNT,
    });
}

export type IncludeReducer<State> = (state: Readonly<State> | undefined, action: Readonly<IncludeActions>) => State;

export interface IncludeReducerCallbacks<State> {
    addTodo: (state: Readonly<State>, todo: Todo) => State;
    addTwoTodos: (state: Readonly<State>, firstTodo: Todo, secondTodo: Todo) => State;
    setTodos: (state: Readonly<State>, todos: Todo[]) => State;
    removeTodo: (state: Readonly<State>, todo: Todo) => State;
    clearTodos: (state: Readonly<State>) => State;
    hiddenState: {
        hiddenStateIncreaseCount: (state: Readonly<State>) => State;
    };
    anotherHiddenState: {
        increaseCount: (state: Readonly<State>) => State;
    };
    indirectHiddenState: {
        nested: {
            increaseCount: (state: Readonly<State>) => State;
        };
    };
    aLastHiddenState: {
        increaseCount: (state: Readonly<State>) => State;
    };
}

export function genIncludeReducer<State>(
    initialState: State,
    callbacks: IncludeReducerCallbacks<State>,
    freeze: (state: State) => State = deepFreeze
): IncludeReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<IncludeActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case ADD_TODO:
                return freezeFunc(callbacks.addTodo(state, action.todo));
            case ADD_TWO_TODOS:
                return freezeFunc(callbacks.addTwoTodos(state, action.firstTodo, action.secondTodo));
            case SET_TODOS:
                return freezeFunc(callbacks.setTodos(state, action.todos));
            case REMOVE_TODO:
                return freezeFunc(callbacks.removeTodo(state, action.todo));
            case CLEAR_TODOS:
                return freezeFunc(callbacks.clearTodos(state));
            case HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT:
                return freezeFunc(callbacks.hiddenState.hiddenStateIncreaseCount(state));
            case ANOTHER_HIDDEN_STATE___INCREASE_COUNT:
                return freezeFunc(callbacks.anotherHiddenState.increaseCount(state));
            case INDIRECT_HIDDEN_STATE__NESTED___INCREASE_COUNT:
                return freezeFunc(callbacks.indirectHiddenState.nested.increaseCount(state));
            case A_LAST_HIDDEN_STATE___INCREASE_COUNT:
                return freezeFunc(callbacks.aLastHiddenState.increaseCount(state));
            default:
                return freezeFunc(state);
        }
    };
}
