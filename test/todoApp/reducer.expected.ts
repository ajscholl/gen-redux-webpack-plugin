// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/todoApp/redux.yml, edit that file instead.

import { Todo } from "./types";
import { genTodoAppReducer } from "./actions";
import sortTodos from "./sort";

export interface TodoAppState {
    todos: Todo[];
}

const initialState: TodoAppState = {
    todos: [],
};

export const todoAppReducer = genTodoAppReducer(initialState, {
    addTodo: (state: TodoAppState, todo: Todo): TodoAppState => ({
        ...state,
        todos: sortTodos([...state.todos, todo]),
    }),
    addTwoTodos: (state: TodoAppState, firstTodo: Todo, secondTodo: Todo): TodoAppState => ({
        ...state,
        todos: sortTodos([...state.todos, firstTodo, secondTodo]),
    }),
    setTodos: (state: TodoAppState, todos: Todo[]): TodoAppState => ({
        ...state,
        todos,
    }),
    removeTodo: (state: TodoAppState, todo: Todo): TodoAppState => ({
        ...state,
        todos: state.todos.filter((elem) => elem.id !== todo.id),
    }),
    clearTodos: (state: TodoAppState): TodoAppState => ({
        ...state,
        todos: [],
    }),
});
