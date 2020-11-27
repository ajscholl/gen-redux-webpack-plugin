// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/todoApp/redux.yml, edit that file instead.

import { Action, deepFreeze } from "../utils";
import { Todo } from "./types";

export const ADD_TODO = "TODO_APP_ADD_TODO";
export const ADD_TWO_TODOS = "TODO_APP_ADD_TWO_TODOS";
export const SET_TODOS = "TODO_APP_SET_TODOS";
export const REMOVE_TODO = "TODO_APP_REMOVE_TODO";
export const CLEAR_TODOS = "TODO_APP_CLEAR_TODOS";

export interface ITodoAppAddTodoAction extends Action<string> {
    type: typeof ADD_TODO;
    todo: Todo;
}

export interface ITodoAppAddTwoTodosAction extends Action<string> {
    type: typeof ADD_TWO_TODOS;
    firstTodo: Todo;
    secondTodo: Todo;
}

export interface ITodoAppSetTodosAction extends Action<string> {
    type: typeof SET_TODOS;
    todos: Todo[];
}

export interface ITodoAppRemoveTodoAction extends Action<string> {
    type: typeof REMOVE_TODO;
    todo: Todo;
}

export interface ITodoAppClearTodosAction extends Action<string> {
    type: typeof CLEAR_TODOS;
}

export type TodoAppActions = ITodoAppAddTodoAction | ITodoAppAddTwoTodosAction | ITodoAppSetTodosAction | ITodoAppRemoveTodoAction | ITodoAppClearTodosAction;

export function todoAppAddTodoAction(todo: Todo): ITodoAppAddTodoAction {
    return Object.freeze({
        type: ADD_TODO,
        todo,
    });
}

export function todoAppAddTwoTodosAction(firstTodo: Todo, secondTodo: Todo): ITodoAppAddTwoTodosAction {
    return Object.freeze({
        type: ADD_TWO_TODOS,
        firstTodo,
        secondTodo,
    });
}

export function todoAppSetTodosAction(todos: Todo[]): ITodoAppSetTodosAction {
    return Object.freeze({
        type: SET_TODOS,
        todos,
    });
}

export function todoAppRemoveTodoAction(todo: Todo): ITodoAppRemoveTodoAction {
    return Object.freeze({
        type: REMOVE_TODO,
        todo,
    });
}

export function todoAppClearTodosAction(): ITodoAppClearTodosAction {
    return Object.freeze({
        type: CLEAR_TODOS,
    });
}

export type TodoAppReducer<State> = (state: Readonly<State> | undefined, action: Readonly<TodoAppActions>) => State;

export interface TodoAppReducerCallbacks<State> {
    addTodo: (state: Readonly<State>, todo: Todo) => State;
    addTwoTodos: (state: Readonly<State>, firstTodo: Todo, secondTodo: Todo) => State;
    setTodos: (state: Readonly<State>, todos: Todo[]) => State;
    removeTodo: (state: Readonly<State>, todo: Todo) => State;
    clearTodos: (state: Readonly<State>) => State;
}

export function genTodoAppReducer<State>(initialState: State, callbacks: TodoAppReducerCallbacks<State>, freeze: (state: State) => State = deepFreeze): TodoAppReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<TodoAppActions>): State => {
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
            default:
                return freezeFunc(state);
        }
    };
}
