// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/todoApp/redux.yml, edit that file instead.

import { ConnectedComponent, DistributiveOmit, GetLibraryManagedProps, GetProps, Matching, Shared, connect } from "../react-redux";
import {
    genTodoAppReducer,
    todoAppAddTodoAction,
    todoAppAddTwoTodosAction,
    todoAppClearTodosAction,
    todoAppRemoveTodoAction,
    todoAppSetTodosAction,
} from "./actions";
import { ComponentType } from "../react";
import { Dispatch } from "../utils";
import { Todo } from "./types";
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

export interface TodoAppStateProps {
    todos: Todo[];
}

export function mapStateToProps(state: TodoAppState): TodoAppStateProps {
    return {
        todos: state.todos,
    };
}

export interface TodoAppDispatchProps {
    addTodo(todo: Todo): void;
    addTwoTodos(firstTodo: Todo, secondTodo: Todo): void;
    setTodos(todos: Todo[]): void;
    removeTodo(todo: Todo): void;
    clearTodos(): void;
}

export function mapDispatchToProps(dispatch: Dispatch): TodoAppDispatchProps {
    return {
        addTodo: (todo: Todo): void => dispatch(todoAppAddTodoAction(todo)),
        addTwoTodos: (firstTodo: Todo, secondTodo: Todo): void => dispatch(todoAppAddTwoTodosAction(firstTodo, secondTodo)),
        setTodos: (todos: Todo[]): void => dispatch(todoAppSetTodosAction(todos)),
        removeTodo: (todo: Todo): void => dispatch(todoAppRemoveTodoAction(todo)),
        clearTodos: (): void => dispatch(todoAppClearTodosAction()),
    };
}

export function connectTodoApp<C extends ComponentType<Matching<TodoAppStateProps & TodoAppDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<GetLibraryManagedProps<C>, keyof Shared<TodoAppStateProps & TodoAppDispatchProps, GetLibraryManagedProps<C>>> & keyof GetProps<C>
> {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
