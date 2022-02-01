// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/combined/redux.yml, edit that file instead.

import { Absolute, Identity } from "../withImport/importList";
import { ConnectedComponent, DistributiveOmit, GetProps, Matching, connect } from "../react-redux2";
import { NormalObject, OtherObject } from "../withImport/normal";
import {
    combinedComplexAction1Action,
    combinedComplexAction2Action,
    combinedComplexAction3Action,
    combinedComplexAction4Action,
    combinedComplexAction5Action,
    combinedComplexAction6Action,
    combinedComplexAction7Action,
    combinedComplexAction8Action,
    combinedComplexAction9Action,
    combinedComplexManyArgsAction,
    combinedComplexSetCallbackAction,
    combinedComplexSetMultipleAction,
    combinedSimpleClearValueAction,
    combinedSimpleSetValueAction,
    combinedTodoAppAddTodoAction,
    combinedTodoAppAddTwoTodosAction,
    combinedTodoAppClearTodosAction,
    combinedTodoAppRemoveTodoAction,
    combinedTodoAppSetTodosAction,
    combinedWithImportPublishDefaultAction,
    combinedWithImportPublishNormalAction,
    combinedYamlSetDefaultAction,
    genCombinedReducer,
    hiddenState__CombinedHiddenStateIncreaseCountAction,
    included_ALastHiddenState__CombinedIncludeIncreaseCountAction,
    included_AnotherHiddenState__CombinedIncludeIncreaseCountAction,
    included_HiddenState__CombinedIncludeHiddenStateIncreaseCountAction,
    included_IndirectHiddenState_Nested__CombinedIncludeIncreaseCountAction,
    included__CombinedIncludeAddTodoAction,
    included__CombinedIncludeAddTwoTodosAction,
    included__CombinedIncludeClearTodosAction,
    included__CombinedIncludeRemoveTodoAction,
    included__CombinedIncludeSetTodosAction,
    reducer__CombinedReducerAdvancePageAction,
    reducer__CombinedReducerClearPageAction,
    reducer__CombinedReducerOtherActionAction,
    reducer__CombinedReducerSetBothPagesAction,
    reducer__CombinedReducerSetFirstPageAction,
    reducer__CombinedReducerSetOtherPageAction,
    reducer__CombinedReducerSetPageAction,
} from "./actions";
import { ComponentType } from "../react2";
import DefaultObject from "../withImport/hasDefault";
import { Dispatch } from "../utils";
import { PageNumber } from "../reducer/page-provider";
import { Todo } from "../todoApp/types";
import sortTodos from "../todoApp/sort";

export interface CombinedState {
    todoAppTodos: Todo[];
    hiddenState: {
        hiddenStateCount: number;
        hiddenStateHiddenCount: number;
    };
    included: {
        includeTodos: Todo[];
        hiddenState: {
            includeHiddenStateCount: number;
            includeHiddenStateHiddenCount: number;
        };
        anotherHiddenState: {
            includeCount: number;
            includeHiddenCount: number;
        };
        indirectHiddenState: {
            nested: {
                includeCount: number;
                includeHiddenCount: number;
            };
        };
        aLastHiddenState: {
            includeCount: number;
            includeHiddenCount: number;
        };
    };
    reducer: {
        reducerPage: PageNumber | null;
        reducerOtherPage: PageNumber;
    };
}

const initialState: CombinedState = {
    todoAppTodos: [],
    hiddenState: {
        hiddenStateCount: 0,
        hiddenStateHiddenCount: 0,
    },
    included: {
        includeTodos: [],
        hiddenState: {
            includeHiddenStateCount: 0,
            includeHiddenStateHiddenCount: 0,
        },
        anotherHiddenState: {
            includeCount: 0,
            includeHiddenCount: 0,
        },
        indirectHiddenState: {
            nested: {
                includeCount: 0,
                includeHiddenCount: 0,
            },
        },
        aLastHiddenState: {
            includeCount: 0,
            includeHiddenCount: 0,
        },
    },
    reducer: {
        reducerPage: null,
        reducerOtherPage: 0,
    },
};

export const combinedReducer = genCombinedReducer(initialState, {
    complexSetCallback: (state: CombinedState): CombinedState => state,
    complexSetMultiple: (state: CombinedState): CombinedState => state,
    complexManyArgs: (state: CombinedState): CombinedState => state,
    complexAction1: (state: CombinedState): CombinedState => state,
    complexAction2: (state: CombinedState): CombinedState => state,
    complexAction3: (state: CombinedState): CombinedState => state,
    complexAction4: (state: CombinedState): CombinedState => state,
    complexAction5: (state: CombinedState): CombinedState => state,
    complexAction6: (state: CombinedState): CombinedState => state,
    complexAction7: (state: CombinedState): CombinedState => state,
    complexAction8: (state: CombinedState): CombinedState => state,
    complexAction9: (state: CombinedState): CombinedState => state,
    simpleSetValue: (state: CombinedState): CombinedState => state,
    simpleClearValue: (state: CombinedState): CombinedState => state,
    todoAppAddTodo: (state: CombinedState, todo: Todo): CombinedState => ({
        ...state,
        todoAppTodos: sortTodos([...state.todoAppTodos, todo]),
    }),
    todoAppAddTwoTodos: (state: CombinedState, firstTodo: Todo, secondTodo: Todo): CombinedState => ({
        ...state,
        todoAppTodos: sortTodos([...state.todoAppTodos, firstTodo, secondTodo]),
    }),
    todoAppSetTodos: (state: CombinedState, todos: Todo[]): CombinedState => ({
        ...state,
        todoAppTodos: todos,
    }),
    todoAppRemoveTodo: (state: CombinedState, todo: Todo): CombinedState => ({
        ...state,
        todoAppTodos: state.todoAppTodos.filter((elem) => elem.id !== todo.id),
    }),
    todoAppClearTodos: (state: CombinedState): CombinedState => ({
        ...state,
        todoAppTodos: [],
    }),
    withImportPublishDefault: (state: CombinedState): CombinedState => state,
    withImportPublishNormal: (state: CombinedState): CombinedState => state,
    yamlSetDefault: (state: CombinedState): CombinedState => state,
    hiddenState: {
        hiddenStateIncreaseCount: (state: CombinedState): CombinedState => ({
            ...state,
            hiddenState: {
                ...state.hiddenState,
                hiddenStateCount: state.hiddenState.hiddenStateHiddenCount > 0 ? state.hiddenState.hiddenStateCount + 1 : state.hiddenState.hiddenStateCount,
                hiddenStateHiddenCount: state.hiddenState.hiddenStateHiddenCount === 0 ? 1 : 0,
            },
        }),
    },
    included: {
        includeAddTodo: (state: CombinedState, todo: Todo): CombinedState => ({
            ...state,
            included: {
                ...state.included,
                includeTodos: sortTodos([...state.included.includeTodos, todo]),
            },
        }),
        includeAddTwoTodos: (state: CombinedState, firstTodo: Todo, secondTodo: Todo): CombinedState => ({
            ...state,
            included: {
                ...state.included,
                includeTodos: sortTodos([...state.included.includeTodos, firstTodo, secondTodo]),
            },
        }),
        includeSetTodos: (state: CombinedState, todos: Todo[]): CombinedState => ({
            ...state,
            included: {
                ...state.included,
                includeTodos: todos,
            },
        }),
        includeRemoveTodo: (state: CombinedState, todo: Todo): CombinedState => ({
            ...state,
            included: {
                ...state.included,
                includeTodos: state.included.includeTodos.filter((elem) => elem.id !== todo.id),
            },
        }),
        includeClearTodos: (state: CombinedState): CombinedState => ({
            ...state,
            included: {
                ...state.included,
                includeTodos: [],
            },
        }),
        hiddenState: {
            includeHiddenStateIncreaseCount: (state: CombinedState): CombinedState => ({
                ...state,
                included: {
                    ...state.included,
                    hiddenState: {
                        ...state.included.hiddenState,
                        // eslint-disable-next-line prettier/prettier
                        includeHiddenStateCount: state.included.hiddenState.includeHiddenStateHiddenCount > 0 ? state.included.hiddenState.includeHiddenStateCount + 1 : state.included.hiddenState.includeHiddenStateCount,
                        includeHiddenStateHiddenCount: state.included.hiddenState.includeHiddenStateHiddenCount === 0 ? 1 : 0,
                    },
                },
            }),
        },
        anotherHiddenState: {
            includeIncreaseCount: (state: CombinedState): CombinedState => ({
                ...state,
                included: {
                    ...state.included,
                    anotherHiddenState: {
                        ...state.included.anotherHiddenState,
                        // eslint-disable-next-line prettier/prettier
                        includeCount: state.included.anotherHiddenState.includeHiddenCount > 0 ? state.included.anotherHiddenState.includeCount + 1 : state.included.anotherHiddenState.includeCount,
                        includeHiddenCount: state.included.anotherHiddenState.includeHiddenCount === 0 ? 1 : 0,
                    },
                },
            }),
        },
        indirectHiddenState: {
            nested: {
                includeIncreaseCount: (state: CombinedState): CombinedState => ({
                    ...state,
                    included: {
                        ...state.included,
                        indirectHiddenState: {
                            ...state.included.indirectHiddenState,
                            nested: {
                                ...state.included.indirectHiddenState.nested,
                                // eslint-disable-next-line prettier/prettier
                                includeCount: state.included.indirectHiddenState.nested.includeHiddenCount > 0 ? state.included.indirectHiddenState.nested.includeCount + 1 : state.included.indirectHiddenState.nested.includeCount,
                                includeHiddenCount: state.included.indirectHiddenState.nested.includeHiddenCount === 0 ? 1 : 0,
                            },
                        },
                    },
                }),
            },
        },
        aLastHiddenState: {
            includeIncreaseCount: (state: CombinedState): CombinedState => ({
                ...state,
                included: {
                    ...state.included,
                    aLastHiddenState: {
                        ...state.included.aLastHiddenState,
                        // eslint-disable-next-line prettier/prettier
                        includeCount: state.included.aLastHiddenState.includeHiddenCount > 0 ? state.included.aLastHiddenState.includeCount + 1 : state.included.aLastHiddenState.includeCount,
                        includeHiddenCount: state.included.aLastHiddenState.includeHiddenCount === 0 ? 1 : 0,
                    },
                },
            }),
        },
    },
    reducer: {
        reducerSetPage: (state: CombinedState, page: PageNumber): CombinedState => ({
            ...state,
            reducer: {
                ...state.reducer,
                reducerPage: page,
            },
        }),
        reducerClearPage: (state: CombinedState): CombinedState => ({
            ...state,
            reducer: {
                ...state.reducer,
                reducerPage: null,
            },
        }),
        reducerSetFirstPage: (state: CombinedState): CombinedState => ({
            ...state,
            reducer: {
                ...state.reducer,
                reducerPage: 1,
            },
        }),
        reducerAdvancePage: (state: CombinedState): CombinedState => ({
            ...state,
            reducer: {
                ...state.reducer,
                reducerPage: (state.reducer.reducerPage || 0) + 1,
            },
        }),
        reducerSetOtherPage: (state: CombinedState, page: PageNumber): CombinedState => ({
            ...state,
            reducer: {
                ...state.reducer,
                reducerOtherPage: page,
            },
        }),
        reducerSetBothPages: (state: CombinedState, page: PageNumber, otherPage: PageNumber): CombinedState => ({
            ...state,
            reducer: {
                ...state.reducer,
                reducerPage: page,
                reducerOtherPage: otherPage,
            },
        }),
        reducerOtherAction: (state: CombinedState): CombinedState => state,
    },
});

export interface CombinedStateProps {
    todoAppTodos: Todo[];
}

export function mapStateToProps(state: CombinedState): CombinedStateProps {
    return {
        todoAppTodos: state.todoAppTodos,
    };
}

export interface CombinedDispatchProps {
    complexSetCallback(callback: () => void): void;
    complexSetMultiple(choice: number | string): void;
    complexManyArgs(arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number, arg8: number, arg9: number): void;
    complexAction1(): void;
    complexAction2(): void;
    complexAction3(): void;
    complexAction4(): void;
    complexAction5(): void;
    complexAction6(): void;
    complexAction7(): void;
    complexAction8(): void;
    complexAction9(): void;
    simpleSetValue(value: string): void;
    simpleClearValue(): void;
    todoAppAddTodo(todo: Todo): void;
    todoAppAddTwoTodos(firstTodo: Todo, secondTodo: Todo): void;
    todoAppSetTodos(todos: Todo[]): void;
    todoAppRemoveTodo(todo: Todo): void;
    todoAppClearTodos(): void;
    withImportPublishDefault(def: Identity<DefaultObject>, isDefault: boolean): void;
    withImportPublishNormal(object: NormalObject, other: OtherObject, otherAbsolute: Absolute<number>): void;
    yamlSetDefault(newDefault: DefaultObject): void;
}

export function mapDispatchToProps(dispatch: Dispatch): CombinedDispatchProps {
    return {
        complexSetCallback: (callback: () => void): void => dispatch(combinedComplexSetCallbackAction(callback)),
        complexSetMultiple: (choice: number | string): void => dispatch(combinedComplexSetMultipleAction(choice)),
        complexManyArgs: (arg1: number, arg2: number, arg3: number, arg4: number, arg5: number, arg6: number, arg7: number, arg8: number, arg9: number): void =>
            dispatch(combinedComplexManyArgsAction(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9)),
        complexAction1: (): void => dispatch(combinedComplexAction1Action()),
        complexAction2: (): void => dispatch(combinedComplexAction2Action()),
        complexAction3: (): void => dispatch(combinedComplexAction3Action()),
        complexAction4: (): void => dispatch(combinedComplexAction4Action()),
        complexAction5: (): void => dispatch(combinedComplexAction5Action()),
        complexAction6: (): void => dispatch(combinedComplexAction6Action()),
        complexAction7: (): void => dispatch(combinedComplexAction7Action()),
        complexAction8: (): void => dispatch(combinedComplexAction8Action()),
        complexAction9: (): void => dispatch(combinedComplexAction9Action()),
        simpleSetValue: (value: string): void => dispatch(combinedSimpleSetValueAction(value)),
        simpleClearValue: (): void => dispatch(combinedSimpleClearValueAction()),
        todoAppAddTodo: (todo: Todo): void => dispatch(combinedTodoAppAddTodoAction(todo)),
        todoAppAddTwoTodos: (firstTodo: Todo, secondTodo: Todo): void => dispatch(combinedTodoAppAddTwoTodosAction(firstTodo, secondTodo)),
        todoAppSetTodos: (todos: Todo[]): void => dispatch(combinedTodoAppSetTodosAction(todos)),
        todoAppRemoveTodo: (todo: Todo): void => dispatch(combinedTodoAppRemoveTodoAction(todo)),
        todoAppClearTodos: (): void => dispatch(combinedTodoAppClearTodosAction()),
        withImportPublishDefault: (def: Identity<DefaultObject>, isDefault: boolean): void => dispatch(combinedWithImportPublishDefaultAction(def, isDefault)),
        withImportPublishNormal: (object: NormalObject, other: OtherObject, otherAbsolute: Absolute<number>): void =>
            dispatch(combinedWithImportPublishNormalAction(object, other, otherAbsolute)),
        yamlSetDefault: (newDefault: DefaultObject): void => dispatch(combinedYamlSetDefaultAction(newDefault)),
    };
}

export function connectCombined<C extends ComponentType<Matching<CombinedStateProps & CombinedDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<C, DistributiveOmit<GetProps<C>, Extract<keyof (CombinedStateProps & CombinedDispatchProps), keyof GetProps<C>>>> {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export interface CombinedHiddenStateStateProps {
    hiddenStateCount: number;
}

export function mapHiddenStateStateToProps(state: CombinedState): CombinedHiddenStateStateProps {
    return {
        hiddenStateCount: state.hiddenState.hiddenStateCount,
    };
}

export interface CombinedHiddenStateDispatchProps {
    hiddenStateIncreaseCount(): void;
}

export function mapHiddenStateDispatchToProps(dispatch: Dispatch): CombinedHiddenStateDispatchProps {
    return {
        hiddenStateIncreaseCount: (): void => dispatch(hiddenState__CombinedHiddenStateIncreaseCountAction()),
    };
}

export function connectCombinedHiddenState<C extends ComponentType<Matching<CombinedHiddenStateStateProps & CombinedHiddenStateDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<C, DistributiveOmit<GetProps<C>, Extract<keyof (CombinedHiddenStateStateProps & CombinedHiddenStateDispatchProps), keyof GetProps<C>>>> {
    return connect(mapHiddenStateStateToProps, mapHiddenStateDispatchToProps)(component);
}

export interface CombinedIncludedStateProps {
    includeTodos: Todo[];
}

export function mapIncludedStateToProps(state: CombinedState): CombinedIncludedStateProps {
    return {
        includeTodos: state.included.includeTodos,
    };
}

export interface CombinedIncludedDispatchProps {
    includeAddTodo(todo: Todo): void;
    includeAddTwoTodos(firstTodo: Todo, secondTodo: Todo): void;
    includeSetTodos(todos: Todo[]): void;
    includeRemoveTodo(todo: Todo): void;
    includeClearTodos(): void;
}

export function mapIncludedDispatchToProps(dispatch: Dispatch): CombinedIncludedDispatchProps {
    return {
        includeAddTodo: (todo: Todo): void => dispatch(included__CombinedIncludeAddTodoAction(todo)),
        includeAddTwoTodos: (firstTodo: Todo, secondTodo: Todo): void => dispatch(included__CombinedIncludeAddTwoTodosAction(firstTodo, secondTodo)),
        includeSetTodos: (todos: Todo[]): void => dispatch(included__CombinedIncludeSetTodosAction(todos)),
        includeRemoveTodo: (todo: Todo): void => dispatch(included__CombinedIncludeRemoveTodoAction(todo)),
        includeClearTodos: (): void => dispatch(included__CombinedIncludeClearTodosAction()),
    };
}

export function connectCombinedIncluded<C extends ComponentType<Matching<CombinedIncludedStateProps & CombinedIncludedDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<C, DistributiveOmit<GetProps<C>, Extract<keyof (CombinedIncludedStateProps & CombinedIncludedDispatchProps), keyof GetProps<C>>>> {
    return connect(mapIncludedStateToProps, mapIncludedDispatchToProps)(component);
}

export interface CombinedIncludedALastHiddenStateStateProps {
    includeCount: number;
}

export function mapIncludedALastHiddenStateStateToProps(state: CombinedState): CombinedIncludedALastHiddenStateStateProps {
    return {
        includeCount: state.included.aLastHiddenState.includeCount,
    };
}

export interface CombinedIncludedALastHiddenStateDispatchProps {
    includeIncreaseCount(): void;
}

export function mapIncludedALastHiddenStateDispatchToProps(dispatch: Dispatch): CombinedIncludedALastHiddenStateDispatchProps {
    return {
        includeIncreaseCount: (): void => dispatch(included_ALastHiddenState__CombinedIncludeIncreaseCountAction()),
    };
}

export function connectCombinedIncludedALastHiddenState<
    C extends ComponentType<Matching<CombinedIncludedALastHiddenStateStateProps & CombinedIncludedALastHiddenStateDispatchProps, GetProps<C>>>
>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<
        GetProps<C>,
        Extract<keyof (CombinedIncludedALastHiddenStateStateProps & CombinedIncludedALastHiddenStateDispatchProps), keyof GetProps<C>>
    >
> {
    return connect(mapIncludedALastHiddenStateStateToProps, mapIncludedALastHiddenStateDispatchToProps)(component);
}

export interface CombinedIncludedAnotherHiddenStateStateProps {
    includeCount: number;
}

export function mapIncludedAnotherHiddenStateStateToProps(state: CombinedState): CombinedIncludedAnotherHiddenStateStateProps {
    return {
        includeCount: state.included.anotherHiddenState.includeCount,
    };
}

export interface CombinedIncludedAnotherHiddenStateDispatchProps {
    includeIncreaseCount(): void;
}

export function mapIncludedAnotherHiddenStateDispatchToProps(dispatch: Dispatch): CombinedIncludedAnotherHiddenStateDispatchProps {
    return {
        includeIncreaseCount: (): void => dispatch(included_AnotherHiddenState__CombinedIncludeIncreaseCountAction()),
    };
}

export function connectCombinedIncludedAnotherHiddenState<
    C extends ComponentType<Matching<CombinedIncludedAnotherHiddenStateStateProps & CombinedIncludedAnotherHiddenStateDispatchProps, GetProps<C>>>
>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<
        GetProps<C>,
        Extract<keyof (CombinedIncludedAnotherHiddenStateStateProps & CombinedIncludedAnotherHiddenStateDispatchProps), keyof GetProps<C>>
    >
> {
    return connect(mapIncludedAnotherHiddenStateStateToProps, mapIncludedAnotherHiddenStateDispatchToProps)(component);
}

export interface CombinedIncludedHiddenStateStateProps {
    includeHiddenStateCount: number;
}

export function mapIncludedHiddenStateStateToProps(state: CombinedState): CombinedIncludedHiddenStateStateProps {
    return {
        includeHiddenStateCount: state.included.hiddenState.includeHiddenStateCount,
    };
}

export interface CombinedIncludedHiddenStateDispatchProps {
    includeHiddenStateIncreaseCount(): void;
}

export function mapIncludedHiddenStateDispatchToProps(dispatch: Dispatch): CombinedIncludedHiddenStateDispatchProps {
    return {
        includeHiddenStateIncreaseCount: (): void => dispatch(included_HiddenState__CombinedIncludeHiddenStateIncreaseCountAction()),
    };
}

export function connectCombinedIncludedHiddenState<
    C extends ComponentType<Matching<CombinedIncludedHiddenStateStateProps & CombinedIncludedHiddenStateDispatchProps, GetProps<C>>>
>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<GetProps<C>, Extract<keyof (CombinedIncludedHiddenStateStateProps & CombinedIncludedHiddenStateDispatchProps), keyof GetProps<C>>>
> {
    return connect(mapIncludedHiddenStateStateToProps, mapIncludedHiddenStateDispatchToProps)(component);
}

export interface CombinedIncludedIndirectHiddenStateNestedStateProps {
    includeCount: number;
}

export function mapIncludedIndirectHiddenStateNestedStateToProps(state: CombinedState): CombinedIncludedIndirectHiddenStateNestedStateProps {
    return {
        includeCount: state.included.indirectHiddenState.nested.includeCount,
    };
}

export interface CombinedIncludedIndirectHiddenStateNestedDispatchProps {
    includeIncreaseCount(): void;
}

export function mapIncludedIndirectHiddenStateNestedDispatchToProps(dispatch: Dispatch): CombinedIncludedIndirectHiddenStateNestedDispatchProps {
    return {
        includeIncreaseCount: (): void => dispatch(included_IndirectHiddenState_Nested__CombinedIncludeIncreaseCountAction()),
    };
}

export function connectCombinedIncludedIndirectHiddenStateNested<
    C extends ComponentType<Matching<CombinedIncludedIndirectHiddenStateNestedStateProps & CombinedIncludedIndirectHiddenStateNestedDispatchProps, GetProps<C>>>
>(
    component: C
): ConnectedComponent<
    C,
    DistributiveOmit<
        GetProps<C>,
        Extract<keyof (CombinedIncludedIndirectHiddenStateNestedStateProps & CombinedIncludedIndirectHiddenStateNestedDispatchProps), keyof GetProps<C>>
    >
> {
    return connect(mapIncludedIndirectHiddenStateNestedStateToProps, mapIncludedIndirectHiddenStateNestedDispatchToProps)(component);
}

export interface CombinedReducerStateProps {
    reducerPage: PageNumber | null;
    reducerOtherPage: PageNumber;
}

export function mapReducerStateToProps(state: CombinedState): CombinedReducerStateProps {
    return {
        reducerPage: state.reducer.reducerPage,
        reducerOtherPage: state.reducer.reducerOtherPage,
    };
}

export interface CombinedReducerDispatchProps {
    reducerSetPage(page: PageNumber): void;
    reducerClearPage(): void;
    reducerSetFirstPage(): void;
    reducerAdvancePage(): void;
    reducerSetOtherPage(page: PageNumber): void;
    reducerSetBothPages(page: PageNumber, otherPage: PageNumber): void;
    reducerOtherAction(field: number): void;
}

export function mapReducerDispatchToProps(dispatch: Dispatch): CombinedReducerDispatchProps {
    return {
        reducerSetPage: (page: PageNumber): void => dispatch(reducer__CombinedReducerSetPageAction(page)),
        reducerClearPage: (): void => dispatch(reducer__CombinedReducerClearPageAction()),
        reducerSetFirstPage: (): void => dispatch(reducer__CombinedReducerSetFirstPageAction()),
        reducerAdvancePage: (): void => dispatch(reducer__CombinedReducerAdvancePageAction()),
        reducerSetOtherPage: (page: PageNumber): void => dispatch(reducer__CombinedReducerSetOtherPageAction(page)),
        reducerSetBothPages: (page: PageNumber, otherPage: PageNumber): void => dispatch(reducer__CombinedReducerSetBothPagesAction(page, otherPage)),
        reducerOtherAction: (field: number): void => dispatch(reducer__CombinedReducerOtherActionAction(field)),
    };
}

export function connectCombinedReducer<C extends ComponentType<Matching<CombinedReducerStateProps & CombinedReducerDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<C, DistributiveOmit<GetProps<C>, Extract<keyof (CombinedReducerStateProps & CombinedReducerDispatchProps), keyof GetProps<C>>>> {
    return connect(mapReducerStateToProps, mapReducerDispatchToProps)(component);
}
