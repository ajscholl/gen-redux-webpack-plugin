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
    addTodo: (state, todo: Todo) => ({
        ...state,
        todos: sortTodos([...state.todos, todo]),
    }),
    addTwoTodos: (state, firstTodo: Todo, secondTodo: Todo) => ({
        ...state,
        todos: sortTodos([...state.todos, firstTodo, secondTodo]),
    }),
    setTodos: (state, todos: Todo[]) => ({
        ...state,
        todos,
    }),
    removeTodo: (state, todo: Todo) => ({
        ...state,
        todos: state.todos.filter((elem) => elem.id !== todo.id),
    }),
    clearTodos: (state) => ({
        ...state,
        todos: [],
    }),
});
