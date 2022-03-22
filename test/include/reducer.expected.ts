// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/include/redux.yml, edit that file instead.

import { ConnectedComponent, DistributiveOmit, GetLibraryManagedProps, GetProps, Matching, Shared, connect } from "../react-redux2";
import {
    aLastHiddenState__IncludeIncreaseCountAction,
    anotherHiddenState__IncludeIncreaseCountAction,
    genIncludeReducer,
    hiddenState__IncludeHiddenStateIncreaseCountAction,
    includeAddTodoAction,
    includeAddTwoTodosAction,
    includeClearTodosAction,
    includeRemoveTodoAction,
    includeSetTodosAction,
    indirectHiddenState_Nested__IncludeIncreaseCountAction,
} from "./actions";
import { ComponentType } from "../react2";
import { Dispatch } from "../utils";
import { Todo } from "../todoApp/types";
import sortTodos from "../todoApp/sort";

export interface IncludeState {
    todos: Todo[];
    hiddenState: {
        hiddenStateCount: number;
        hiddenStateHiddenCount: number;
    };
    anotherHiddenState: {
        count: number;
        hiddenCount: number;
    };
    indirectHiddenState: {
        nested: {
            count: number;
            hiddenCount: number;
        };
    };
    aLastHiddenState: {
        count: number;
        hiddenCount: number;
    };
}

const initialState: IncludeState = {
    todos: [],
    hiddenState: {
        hiddenStateCount: 0,
        hiddenStateHiddenCount: 0,
    },
    anotherHiddenState: {
        count: 0,
        hiddenCount: 0,
    },
    indirectHiddenState: {
        nested: {
            count: 0,
            hiddenCount: 0,
        },
    },
    aLastHiddenState: {
        count: 0,
        hiddenCount: 0,
    },
};

export const includeReducer = genIncludeReducer(initialState, {
    addTodo: (state: IncludeState, todo: Todo): IncludeState => ({
        ...state,
        todos: sortTodos([...state.todos, todo]),
    }),
    addTwoTodos: (state: IncludeState, firstTodo: Todo, secondTodo: Todo): IncludeState => ({
        ...state,
        todos: sortTodos([...state.todos, firstTodo, secondTodo]),
    }),
    setTodos: (state: IncludeState, todos: Todo[]): IncludeState => ({
        ...state,
        todos,
    }),
    removeTodo: (state: IncludeState, todo: Todo): IncludeState => ({
        ...state,
        todos: state.todos.filter((elem) => elem.id !== todo.id),
    }),
    clearTodos: (state: IncludeState): IncludeState => ({
        ...state,
        todos: [],
    }),
    hiddenState: {
        hiddenStateIncreaseCount: (state: IncludeState): IncludeState => ({
            ...state,
            hiddenState: {
                ...state.hiddenState,
                hiddenStateCount: state.hiddenState.hiddenStateHiddenCount > 0 ? state.hiddenState.hiddenStateCount + 1 : state.hiddenState.hiddenStateCount,
                hiddenStateHiddenCount: state.hiddenState.hiddenStateHiddenCount === 0 ? 1 : 0,
            },
        }),
    },
    anotherHiddenState: {
        increaseCount: (state: IncludeState): IncludeState => ({
            ...state,
            anotherHiddenState: {
                ...state.anotherHiddenState,
                count: state.anotherHiddenState.hiddenCount > 0 ? state.anotherHiddenState.count + 1 : state.anotherHiddenState.count,
                hiddenCount: state.anotherHiddenState.hiddenCount === 0 ? 1 : 0,
            },
        }),
    },
    indirectHiddenState: {
        nested: {
            increaseCount: (state: IncludeState): IncludeState => ({
                ...state,
                indirectHiddenState: {
                    ...state.indirectHiddenState,
                    nested: {
                        ...state.indirectHiddenState.nested,
                        // eslint-disable-next-line prettier/prettier
                        count: state.indirectHiddenState.nested.hiddenCount > 0 ? state.indirectHiddenState.nested.count + 1 : state.indirectHiddenState.nested.count,
                        hiddenCount: state.indirectHiddenState.nested.hiddenCount === 0 ? 1 : 0,
                    },
                },
            }),
        },
    },
    aLastHiddenState: {
        increaseCount: (state: IncludeState): IncludeState => ({
            ...state,
            aLastHiddenState: {
                ...state.aLastHiddenState,
                count: state.aLastHiddenState.hiddenCount > 0 ? state.aLastHiddenState.count + 1 : state.aLastHiddenState.count,
                hiddenCount: state.aLastHiddenState.hiddenCount === 0 ? 1 : 0,
            },
        }),
    },
});

export interface IncludeStateProps {
    todos: Todo[];
}

export function mapStateToProps(state: IncludeState): IncludeStateProps {
    return {
        todos: state.todos,
    };
}

export interface IncludeDispatchProps {
    addTodo(todo: Todo): void;
    addTwoTodos(firstTodo: Todo, secondTodo: Todo): void;
    setTodos(todos: Todo[]): void;
    removeTodo(todo: Todo): void;
    clearTodos(): void;
}

export function mapDispatchToProps(dispatch: Dispatch): IncludeDispatchProps {
    return {
        addTodo: (todo: Todo): void => dispatch(includeAddTodoAction(todo)),
        addTwoTodos: (firstTodo: Todo, secondTodo: Todo): void => dispatch(includeAddTwoTodosAction(firstTodo, secondTodo)),
        setTodos: (todos: Todo[]): void => dispatch(includeSetTodosAction(todos)),
        removeTodo: (todo: Todo): void => dispatch(includeRemoveTodoAction(todo)),
        clearTodos: (): void => dispatch(includeClearTodosAction()),
    };
}

export function connectInclude<C extends ComponentType<Matching<IncludeStateProps & IncludeDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<GetLibraryManagedProps<C>, keyof Shared<IncludeStateProps & IncludeDispatchProps, GetLibraryManagedProps<C>>> & keyof GetProps<C>
> {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export interface IncludeALastHiddenStateStateProps {
    count: number;
}

export function mapALastHiddenStateStateToProps(state: IncludeState): IncludeALastHiddenStateStateProps {
    return {
        count: state.aLastHiddenState.count,
    };
}

export interface IncludeALastHiddenStateDispatchProps {
    increaseCount(): void;
}

export function mapALastHiddenStateDispatchToProps(dispatch: Dispatch): IncludeALastHiddenStateDispatchProps {
    return {
        increaseCount: (): void => dispatch(aLastHiddenState__IncludeIncreaseCountAction()),
    };
}

export function connectIncludeALastHiddenState<
    C extends ComponentType<Matching<IncludeALastHiddenStateStateProps & IncludeALastHiddenStateDispatchProps, GetProps<C>>>
>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<
        GetLibraryManagedProps<C>,
        keyof Shared<IncludeALastHiddenStateStateProps & IncludeALastHiddenStateDispatchProps, GetLibraryManagedProps<C>>
    > &
        keyof GetProps<C>
> {
    return connect(mapALastHiddenStateStateToProps, mapALastHiddenStateDispatchToProps)(component);
}

export interface IncludeAnotherHiddenStateStateProps {
    count: number;
}

export function mapAnotherHiddenStateStateToProps(state: IncludeState): IncludeAnotherHiddenStateStateProps {
    return {
        count: state.anotherHiddenState.count,
    };
}

export interface IncludeAnotherHiddenStateDispatchProps {
    increaseCount(): void;
}

export function mapAnotherHiddenStateDispatchToProps(dispatch: Dispatch): IncludeAnotherHiddenStateDispatchProps {
    return {
        increaseCount: (): void => dispatch(anotherHiddenState__IncludeIncreaseCountAction()),
    };
}

export function connectIncludeAnotherHiddenState<
    C extends ComponentType<Matching<IncludeAnotherHiddenStateStateProps & IncludeAnotherHiddenStateDispatchProps, GetProps<C>>>
>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<
        GetLibraryManagedProps<C>,
        keyof Shared<IncludeAnotherHiddenStateStateProps & IncludeAnotherHiddenStateDispatchProps, GetLibraryManagedProps<C>>
    > &
        keyof GetProps<C>
> {
    return connect(mapAnotherHiddenStateStateToProps, mapAnotherHiddenStateDispatchToProps)(component);
}

export interface IncludeHiddenStateStateProps {
    hiddenStateCount: number;
}

export function mapHiddenStateStateToProps(state: IncludeState): IncludeHiddenStateStateProps {
    return {
        hiddenStateCount: state.hiddenState.hiddenStateCount,
    };
}

export interface IncludeHiddenStateDispatchProps {
    hiddenStateIncreaseCount(): void;
}

export function mapHiddenStateDispatchToProps(dispatch: Dispatch): IncludeHiddenStateDispatchProps {
    return {
        hiddenStateIncreaseCount: (): void => dispatch(hiddenState__IncludeHiddenStateIncreaseCountAction()),
    };
}

export function connectIncludeHiddenState<C extends ComponentType<Matching<IncludeHiddenStateStateProps & IncludeHiddenStateDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<GetLibraryManagedProps<C>, keyof Shared<IncludeHiddenStateStateProps & IncludeHiddenStateDispatchProps, GetLibraryManagedProps<C>>> &
        keyof GetProps<C>
> {
    return connect(mapHiddenStateStateToProps, mapHiddenStateDispatchToProps)(component);
}

export interface IncludeIndirectHiddenStateNestedStateProps {
    count: number;
}

export function mapIndirectHiddenStateNestedStateToProps(state: IncludeState): IncludeIndirectHiddenStateNestedStateProps {
    return {
        count: state.indirectHiddenState.nested.count,
    };
}

export interface IncludeIndirectHiddenStateNestedDispatchProps {
    increaseCount(): void;
}

export function mapIndirectHiddenStateNestedDispatchToProps(dispatch: Dispatch): IncludeIndirectHiddenStateNestedDispatchProps {
    return {
        increaseCount: (): void => dispatch(indirectHiddenState_Nested__IncludeIncreaseCountAction()),
    };
}

export function connectIncludeIndirectHiddenStateNested<
    C extends ComponentType<Matching<IncludeIndirectHiddenStateNestedStateProps & IncludeIndirectHiddenStateNestedDispatchProps, GetProps<C>>>
>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<
        GetLibraryManagedProps<C>,
        keyof Shared<IncludeIndirectHiddenStateNestedStateProps & IncludeIndirectHiddenStateNestedDispatchProps, GetLibraryManagedProps<C>>
    > &
        keyof GetProps<C>
> {
    return connect(mapIndirectHiddenStateNestedStateToProps, mapIndirectHiddenStateNestedDispatchToProps)(component);
}
