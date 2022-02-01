// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated from test/combined/redux.yml, edit that file instead.

import { Absolute, Identity } from "../withImport/importList";
import { Action, deepFreeze } from "../utils";
import { NormalObject, OtherObject } from "../withImport/normal";
import DefaultObject from "../withImport/hasDefault";
import { PageNumber } from "../reducer/page-provider";
import { Todo } from "../todoApp/types";

export const COMPLEX_SET_CALLBACK = "COMBINED_COMPLEX_SET_CALLBACK";
export const COMPLEX_SET_MULTIPLE = "COMBINED_COMPLEX_SET_MULTIPLE";
export const COMPLEX_MANY_ARGS = "COMBINED_COMPLEX_MANY_ARGS";
export const COMPLEX_ACTION1 = "COMBINED_COMPLEX_ACTION1";
export const COMPLEX_ACTION2 = "COMBINED_COMPLEX_ACTION2";
export const COMPLEX_ACTION3 = "COMBINED_COMPLEX_ACTION3";
export const COMPLEX_ACTION4 = "COMBINED_COMPLEX_ACTION4";
export const COMPLEX_ACTION5 = "COMBINED_COMPLEX_ACTION5";
export const COMPLEX_ACTION6 = "COMBINED_COMPLEX_ACTION6";
export const COMPLEX_ACTION7 = "COMBINED_COMPLEX_ACTION7";
export const COMPLEX_ACTION8 = "COMBINED_COMPLEX_ACTION8";
export const COMPLEX_ACTION9 = "COMBINED_COMPLEX_ACTION9";
export const HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT = "HIDDEN_STATE___COMBINED_HIDDEN_STATE_INCREASE_COUNT";
export const INCLUDED___INCLUDE_ADD_TODO = "INCLUDED___COMBINED_INCLUDE_ADD_TODO";
export const INCLUDED___INCLUDE_ADD_TWO_TODOS = "INCLUDED___COMBINED_INCLUDE_ADD_TWO_TODOS";
export const INCLUDED___INCLUDE_SET_TODOS = "INCLUDED___COMBINED_INCLUDE_SET_TODOS";
export const INCLUDED___INCLUDE_REMOVE_TODO = "INCLUDED___COMBINED_INCLUDE_REMOVE_TODO";
export const INCLUDED___INCLUDE_CLEAR_TODOS = "INCLUDED___COMBINED_INCLUDE_CLEAR_TODOS";
export const INCLUDED__HIDDEN_STATE___INCLUDE_HIDDEN_STATE_INCREASE_COUNT = "INCLUDED__HIDDEN_STATE___COMBINED_INCLUDE_HIDDEN_STATE_INCREASE_COUNT";
export const INCLUDED__ANOTHER_HIDDEN_STATE___INCLUDE_INCREASE_COUNT = "INCLUDED__ANOTHER_HIDDEN_STATE___COMBINED_INCLUDE_INCREASE_COUNT";
export const INCLUDED__INDIRECT_HIDDEN_STATE__NESTED___INCLUDE_INCREASE_COUNT = "INCLUDED__INDIRECT_HIDDEN_STATE__NESTED___COMBINED_INCLUDE_INCREASE_COUNT";
export const INCLUDED__A_LAST_HIDDEN_STATE___INCLUDE_INCREASE_COUNT = "INCLUDED__A_LAST_HIDDEN_STATE___COMBINED_INCLUDE_INCREASE_COUNT";
export const REDUCER___REDUCER_SET_PAGE = "REDUCER___COMBINED_REDUCER_SET_PAGE";
export const REDUCER___REDUCER_CLEAR_PAGE = "REDUCER___COMBINED_REDUCER_CLEAR_PAGE";
export const REDUCER___REDUCER_SET_FIRST_PAGE = "REDUCER___COMBINED_REDUCER_SET_FIRST_PAGE";
export const REDUCER___REDUCER_ADVANCE_PAGE = "REDUCER___COMBINED_REDUCER_ADVANCE_PAGE";
export const REDUCER___REDUCER_SET_OTHER_PAGE = "REDUCER___COMBINED_REDUCER_SET_OTHER_PAGE";
export const REDUCER___REDUCER_SET_BOTH_PAGES = "REDUCER___COMBINED_REDUCER_SET_BOTH_PAGES";
export const REDUCER___REDUCER_OTHER_ACTION = "REDUCER___COMBINED_REDUCER_OTHER_ACTION";
export const SIMPLE_SET_VALUE = "COMBINED_SIMPLE_SET_VALUE";
export const SIMPLE_CLEAR_VALUE = "COMBINED_SIMPLE_CLEAR_VALUE";
export const TODO_APP_ADD_TODO = "COMBINED_TODO_APP_ADD_TODO";
export const TODO_APP_ADD_TWO_TODOS = "COMBINED_TODO_APP_ADD_TWO_TODOS";
export const TODO_APP_SET_TODOS = "COMBINED_TODO_APP_SET_TODOS";
export const TODO_APP_REMOVE_TODO = "COMBINED_TODO_APP_REMOVE_TODO";
export const TODO_APP_CLEAR_TODOS = "COMBINED_TODO_APP_CLEAR_TODOS";
export const WITH_IMPORT_PUBLISH_DEFAULT = "COMBINED_WITH_IMPORT_PUBLISH_DEFAULT";
export const WITH_IMPORT_PUBLISH_NORMAL = "COMBINED_WITH_IMPORT_PUBLISH_NORMAL";
export const YAML_SET_DEFAULT = "COMBINED_YAML_SET_DEFAULT";

export interface ICombinedComplexSetCallbackAction extends Action<string> {
    type: typeof COMPLEX_SET_CALLBACK;
    callback: () => void;
}

export interface ICombinedComplexSetMultipleAction extends Action<string> {
    type: typeof COMPLEX_SET_MULTIPLE;
    choice: number | string;
}

export interface ICombinedComplexManyArgsAction extends Action<string> {
    type: typeof COMPLEX_MANY_ARGS;
    arg1: number;
    arg2: number;
    arg3: number;
    arg4: number;
    arg5: number;
    arg6: number;
    arg7: number;
    arg8: number;
    arg9: number;
}

export interface ICombinedComplexAction1Action extends Action<string> {
    type: typeof COMPLEX_ACTION1;
}

export interface ICombinedComplexAction2Action extends Action<string> {
    type: typeof COMPLEX_ACTION2;
}

export interface ICombinedComplexAction3Action extends Action<string> {
    type: typeof COMPLEX_ACTION3;
}

export interface ICombinedComplexAction4Action extends Action<string> {
    type: typeof COMPLEX_ACTION4;
}

export interface ICombinedComplexAction5Action extends Action<string> {
    type: typeof COMPLEX_ACTION5;
}

export interface ICombinedComplexAction6Action extends Action<string> {
    type: typeof COMPLEX_ACTION6;
}

export interface ICombinedComplexAction7Action extends Action<string> {
    type: typeof COMPLEX_ACTION7;
}

export interface ICombinedComplexAction8Action extends Action<string> {
    type: typeof COMPLEX_ACTION8;
}

export interface ICombinedComplexAction9Action extends Action<string> {
    type: typeof COMPLEX_ACTION9;
}

export interface IHiddenState__CombinedHiddenStateIncreaseCountAction extends Action<string> {
    type: typeof HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT;
}

export interface IIncluded__CombinedIncludeAddTodoAction extends Action<string> {
    type: typeof INCLUDED___INCLUDE_ADD_TODO;
    todo: Todo;
}

export interface IIncluded__CombinedIncludeAddTwoTodosAction extends Action<string> {
    type: typeof INCLUDED___INCLUDE_ADD_TWO_TODOS;
    firstTodo: Todo;
    secondTodo: Todo;
}

export interface IIncluded__CombinedIncludeSetTodosAction extends Action<string> {
    type: typeof INCLUDED___INCLUDE_SET_TODOS;
    todos: Todo[];
}

export interface IIncluded__CombinedIncludeRemoveTodoAction extends Action<string> {
    type: typeof INCLUDED___INCLUDE_REMOVE_TODO;
    todo: Todo;
}

export interface IIncluded__CombinedIncludeClearTodosAction extends Action<string> {
    type: typeof INCLUDED___INCLUDE_CLEAR_TODOS;
}

export interface IIncluded_HiddenState__CombinedIncludeHiddenStateIncreaseCountAction extends Action<string> {
    type: typeof INCLUDED__HIDDEN_STATE___INCLUDE_HIDDEN_STATE_INCREASE_COUNT;
}

export interface IIncluded_AnotherHiddenState__CombinedIncludeIncreaseCountAction extends Action<string> {
    type: typeof INCLUDED__ANOTHER_HIDDEN_STATE___INCLUDE_INCREASE_COUNT;
}

export interface IIncluded_IndirectHiddenState_Nested__CombinedIncludeIncreaseCountAction extends Action<string> {
    type: typeof INCLUDED__INDIRECT_HIDDEN_STATE__NESTED___INCLUDE_INCREASE_COUNT;
}

export interface IIncluded_ALastHiddenState__CombinedIncludeIncreaseCountAction extends Action<string> {
    type: typeof INCLUDED__A_LAST_HIDDEN_STATE___INCLUDE_INCREASE_COUNT;
}

export interface IReducer__CombinedReducerSetPageAction extends Action<string> {
    type: typeof REDUCER___REDUCER_SET_PAGE;
    page: PageNumber;
}

export interface IReducer__CombinedReducerClearPageAction extends Action<string> {
    type: typeof REDUCER___REDUCER_CLEAR_PAGE;
}

export interface IReducer__CombinedReducerSetFirstPageAction extends Action<string> {
    type: typeof REDUCER___REDUCER_SET_FIRST_PAGE;
}

export interface IReducer__CombinedReducerAdvancePageAction extends Action<string> {
    type: typeof REDUCER___REDUCER_ADVANCE_PAGE;
}

export interface IReducer__CombinedReducerSetOtherPageAction extends Action<string> {
    type: typeof REDUCER___REDUCER_SET_OTHER_PAGE;
    page: PageNumber;
}

export interface IReducer__CombinedReducerSetBothPagesAction extends Action<string> {
    type: typeof REDUCER___REDUCER_SET_BOTH_PAGES;
    page: PageNumber;
    otherPage: PageNumber;
}

export interface IReducer__CombinedReducerOtherActionAction extends Action<string> {
    type: typeof REDUCER___REDUCER_OTHER_ACTION;
    field: number;
}

export interface ICombinedSimpleSetValueAction extends Action<string> {
    type: typeof SIMPLE_SET_VALUE;
    value: string;
}

export interface ICombinedSimpleClearValueAction extends Action<string> {
    type: typeof SIMPLE_CLEAR_VALUE;
}

export interface ICombinedTodoAppAddTodoAction extends Action<string> {
    type: typeof TODO_APP_ADD_TODO;
    todo: Todo;
}

export interface ICombinedTodoAppAddTwoTodosAction extends Action<string> {
    type: typeof TODO_APP_ADD_TWO_TODOS;
    firstTodo: Todo;
    secondTodo: Todo;
}

export interface ICombinedTodoAppSetTodosAction extends Action<string> {
    type: typeof TODO_APP_SET_TODOS;
    todos: Todo[];
}

export interface ICombinedTodoAppRemoveTodoAction extends Action<string> {
    type: typeof TODO_APP_REMOVE_TODO;
    todo: Todo;
}

export interface ICombinedTodoAppClearTodosAction extends Action<string> {
    type: typeof TODO_APP_CLEAR_TODOS;
}

export interface ICombinedWithImportPublishDefaultAction extends Action<string> {
    type: typeof WITH_IMPORT_PUBLISH_DEFAULT;
    def: Identity<DefaultObject>;
    isDefault: boolean;
}

export interface ICombinedWithImportPublishNormalAction extends Action<string> {
    type: typeof WITH_IMPORT_PUBLISH_NORMAL;
    object: NormalObject;
    other: OtherObject;
    otherAbsolute: Absolute<number>;
}

export interface ICombinedYamlSetDefaultAction extends Action<string> {
    type: typeof YAML_SET_DEFAULT;
    newDefault: DefaultObject;
}

export type CombinedActions =
    | ICombinedComplexSetCallbackAction
    | ICombinedComplexSetMultipleAction
    | ICombinedComplexManyArgsAction
    | ICombinedComplexAction1Action
    | ICombinedComplexAction2Action
    | ICombinedComplexAction3Action
    | ICombinedComplexAction4Action
    | ICombinedComplexAction5Action
    | ICombinedComplexAction6Action
    | ICombinedComplexAction7Action
    | ICombinedComplexAction8Action
    | ICombinedComplexAction9Action
    | IHiddenState__CombinedHiddenStateIncreaseCountAction
    | IIncluded__CombinedIncludeAddTodoAction
    | IIncluded__CombinedIncludeAddTwoTodosAction
    | IIncluded__CombinedIncludeSetTodosAction
    | IIncluded__CombinedIncludeRemoveTodoAction
    | IIncluded__CombinedIncludeClearTodosAction
    | IIncluded_HiddenState__CombinedIncludeHiddenStateIncreaseCountAction
    | IIncluded_AnotherHiddenState__CombinedIncludeIncreaseCountAction
    | IIncluded_IndirectHiddenState_Nested__CombinedIncludeIncreaseCountAction
    | IIncluded_ALastHiddenState__CombinedIncludeIncreaseCountAction
    | IReducer__CombinedReducerSetPageAction
    | IReducer__CombinedReducerClearPageAction
    | IReducer__CombinedReducerSetFirstPageAction
    | IReducer__CombinedReducerAdvancePageAction
    | IReducer__CombinedReducerSetOtherPageAction
    | IReducer__CombinedReducerSetBothPagesAction
    | IReducer__CombinedReducerOtherActionAction
    | ICombinedSimpleSetValueAction
    | ICombinedSimpleClearValueAction
    | ICombinedTodoAppAddTodoAction
    | ICombinedTodoAppAddTwoTodosAction
    | ICombinedTodoAppSetTodosAction
    | ICombinedTodoAppRemoveTodoAction
    | ICombinedTodoAppClearTodosAction
    | ICombinedWithImportPublishDefaultAction
    | ICombinedWithImportPublishNormalAction
    | ICombinedYamlSetDefaultAction;

export function combinedComplexSetCallbackAction(callback: () => void): ICombinedComplexSetCallbackAction {
    return Object.freeze({
        type: COMPLEX_SET_CALLBACK,
        callback,
    });
}

export function combinedComplexSetMultipleAction(choice: number | string): ICombinedComplexSetMultipleAction {
    return Object.freeze({
        type: COMPLEX_SET_MULTIPLE,
        choice,
    });
}

export function combinedComplexManyArgsAction(
    arg1: number,
    arg2: number,
    arg3: number,
    arg4: number,
    arg5: number,
    arg6: number,
    arg7: number,
    arg8: number,
    arg9: number
): ICombinedComplexManyArgsAction {
    return Object.freeze({
        type: COMPLEX_MANY_ARGS,
        arg1,
        arg2,
        arg3,
        arg4,
        arg5,
        arg6,
        arg7,
        arg8,
        arg9,
    });
}

export function combinedComplexAction1Action(): ICombinedComplexAction1Action {
    return Object.freeze({
        type: COMPLEX_ACTION1,
    });
}

export function combinedComplexAction2Action(): ICombinedComplexAction2Action {
    return Object.freeze({
        type: COMPLEX_ACTION2,
    });
}

export function combinedComplexAction3Action(): ICombinedComplexAction3Action {
    return Object.freeze({
        type: COMPLEX_ACTION3,
    });
}

export function combinedComplexAction4Action(): ICombinedComplexAction4Action {
    return Object.freeze({
        type: COMPLEX_ACTION4,
    });
}

export function combinedComplexAction5Action(): ICombinedComplexAction5Action {
    return Object.freeze({
        type: COMPLEX_ACTION5,
    });
}

export function combinedComplexAction6Action(): ICombinedComplexAction6Action {
    return Object.freeze({
        type: COMPLEX_ACTION6,
    });
}

export function combinedComplexAction7Action(): ICombinedComplexAction7Action {
    return Object.freeze({
        type: COMPLEX_ACTION7,
    });
}

export function combinedComplexAction8Action(): ICombinedComplexAction8Action {
    return Object.freeze({
        type: COMPLEX_ACTION8,
    });
}

export function combinedComplexAction9Action(): ICombinedComplexAction9Action {
    return Object.freeze({
        type: COMPLEX_ACTION9,
    });
}

export function hiddenState__CombinedHiddenStateIncreaseCountAction(): IHiddenState__CombinedHiddenStateIncreaseCountAction {
    return Object.freeze({
        type: HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT,
    });
}

export function included__CombinedIncludeAddTodoAction(todo: Todo): IIncluded__CombinedIncludeAddTodoAction {
    return Object.freeze({
        type: INCLUDED___INCLUDE_ADD_TODO,
        todo,
    });
}

export function included__CombinedIncludeAddTwoTodosAction(firstTodo: Todo, secondTodo: Todo): IIncluded__CombinedIncludeAddTwoTodosAction {
    return Object.freeze({
        type: INCLUDED___INCLUDE_ADD_TWO_TODOS,
        firstTodo,
        secondTodo,
    });
}

export function included__CombinedIncludeSetTodosAction(todos: Todo[]): IIncluded__CombinedIncludeSetTodosAction {
    return Object.freeze({
        type: INCLUDED___INCLUDE_SET_TODOS,
        todos,
    });
}

export function included__CombinedIncludeRemoveTodoAction(todo: Todo): IIncluded__CombinedIncludeRemoveTodoAction {
    return Object.freeze({
        type: INCLUDED___INCLUDE_REMOVE_TODO,
        todo,
    });
}

export function included__CombinedIncludeClearTodosAction(): IIncluded__CombinedIncludeClearTodosAction {
    return Object.freeze({
        type: INCLUDED___INCLUDE_CLEAR_TODOS,
    });
}

export function included_HiddenState__CombinedIncludeHiddenStateIncreaseCountAction(): IIncluded_HiddenState__CombinedIncludeHiddenStateIncreaseCountAction {
    return Object.freeze({
        type: INCLUDED__HIDDEN_STATE___INCLUDE_HIDDEN_STATE_INCREASE_COUNT,
    });
}

export function included_AnotherHiddenState__CombinedIncludeIncreaseCountAction(): IIncluded_AnotherHiddenState__CombinedIncludeIncreaseCountAction {
    return Object.freeze({
        type: INCLUDED__ANOTHER_HIDDEN_STATE___INCLUDE_INCREASE_COUNT,
    });
}

export function included_IndirectHiddenState_Nested__CombinedIncludeIncreaseCountAction(): IIncluded_IndirectHiddenState_Nested__CombinedIncludeIncreaseCountAction {
    return Object.freeze({
        type: INCLUDED__INDIRECT_HIDDEN_STATE__NESTED___INCLUDE_INCREASE_COUNT,
    });
}

export function included_ALastHiddenState__CombinedIncludeIncreaseCountAction(): IIncluded_ALastHiddenState__CombinedIncludeIncreaseCountAction {
    return Object.freeze({
        type: INCLUDED__A_LAST_HIDDEN_STATE___INCLUDE_INCREASE_COUNT,
    });
}

export function reducer__CombinedReducerSetPageAction(page: PageNumber): IReducer__CombinedReducerSetPageAction {
    return Object.freeze({
        type: REDUCER___REDUCER_SET_PAGE,
        page,
    });
}

export function reducer__CombinedReducerClearPageAction(): IReducer__CombinedReducerClearPageAction {
    return Object.freeze({
        type: REDUCER___REDUCER_CLEAR_PAGE,
    });
}

export function reducer__CombinedReducerSetFirstPageAction(): IReducer__CombinedReducerSetFirstPageAction {
    return Object.freeze({
        type: REDUCER___REDUCER_SET_FIRST_PAGE,
    });
}

export function reducer__CombinedReducerAdvancePageAction(): IReducer__CombinedReducerAdvancePageAction {
    return Object.freeze({
        type: REDUCER___REDUCER_ADVANCE_PAGE,
    });
}

export function reducer__CombinedReducerSetOtherPageAction(page: PageNumber): IReducer__CombinedReducerSetOtherPageAction {
    return Object.freeze({
        type: REDUCER___REDUCER_SET_OTHER_PAGE,
        page,
    });
}

export function reducer__CombinedReducerSetBothPagesAction(page: PageNumber, otherPage: PageNumber): IReducer__CombinedReducerSetBothPagesAction {
    return Object.freeze({
        type: REDUCER___REDUCER_SET_BOTH_PAGES,
        page,
        otherPage,
    });
}

export function reducer__CombinedReducerOtherActionAction(field: number): IReducer__CombinedReducerOtherActionAction {
    return Object.freeze({
        type: REDUCER___REDUCER_OTHER_ACTION,
        field,
    });
}

export function combinedSimpleSetValueAction(value: string): ICombinedSimpleSetValueAction {
    return Object.freeze({
        type: SIMPLE_SET_VALUE,
        value,
    });
}

export function combinedSimpleClearValueAction(): ICombinedSimpleClearValueAction {
    return Object.freeze({
        type: SIMPLE_CLEAR_VALUE,
    });
}

export function combinedTodoAppAddTodoAction(todo: Todo): ICombinedTodoAppAddTodoAction {
    return Object.freeze({
        type: TODO_APP_ADD_TODO,
        todo,
    });
}

export function combinedTodoAppAddTwoTodosAction(firstTodo: Todo, secondTodo: Todo): ICombinedTodoAppAddTwoTodosAction {
    return Object.freeze({
        type: TODO_APP_ADD_TWO_TODOS,
        firstTodo,
        secondTodo,
    });
}

export function combinedTodoAppSetTodosAction(todos: Todo[]): ICombinedTodoAppSetTodosAction {
    return Object.freeze({
        type: TODO_APP_SET_TODOS,
        todos,
    });
}

export function combinedTodoAppRemoveTodoAction(todo: Todo): ICombinedTodoAppRemoveTodoAction {
    return Object.freeze({
        type: TODO_APP_REMOVE_TODO,
        todo,
    });
}

export function combinedTodoAppClearTodosAction(): ICombinedTodoAppClearTodosAction {
    return Object.freeze({
        type: TODO_APP_CLEAR_TODOS,
    });
}

export function combinedWithImportPublishDefaultAction(def: Identity<DefaultObject>, isDefault: boolean): ICombinedWithImportPublishDefaultAction {
    return Object.freeze({
        type: WITH_IMPORT_PUBLISH_DEFAULT,
        def,
        isDefault,
    });
}

export function combinedWithImportPublishNormalAction(
    object: NormalObject,
    other: OtherObject,
    otherAbsolute: Absolute<number>
): ICombinedWithImportPublishNormalAction {
    return Object.freeze({
        type: WITH_IMPORT_PUBLISH_NORMAL,
        object,
        other,
        otherAbsolute,
    });
}

export function combinedYamlSetDefaultAction(newDefault: DefaultObject): ICombinedYamlSetDefaultAction {
    return Object.freeze({
        type: YAML_SET_DEFAULT,
        newDefault,
    });
}

export type CombinedReducer<State> = (state: Readonly<State> | undefined, action: Readonly<CombinedActions>) => State;

export interface CombinedReducerCallbacks<State> {
    complexSetCallback: (state: Readonly<State>, callback: () => void) => State;
    complexSetMultiple: (state: Readonly<State>, choice: number | string) => State;
    complexManyArgs: (
        state: Readonly<State>,
        arg1: number,
        arg2: number,
        arg3: number,
        arg4: number,
        arg5: number,
        arg6: number,
        arg7: number,
        arg8: number,
        arg9: number
    ) => State;
    complexAction1: (state: Readonly<State>) => State;
    complexAction2: (state: Readonly<State>) => State;
    complexAction3: (state: Readonly<State>) => State;
    complexAction4: (state: Readonly<State>) => State;
    complexAction5: (state: Readonly<State>) => State;
    complexAction6: (state: Readonly<State>) => State;
    complexAction7: (state: Readonly<State>) => State;
    complexAction8: (state: Readonly<State>) => State;
    complexAction9: (state: Readonly<State>) => State;
    simpleSetValue: (state: Readonly<State>, value: string) => State;
    simpleClearValue: (state: Readonly<State>) => State;
    todoAppAddTodo: (state: Readonly<State>, todo: Todo) => State;
    todoAppAddTwoTodos: (state: Readonly<State>, firstTodo: Todo, secondTodo: Todo) => State;
    todoAppSetTodos: (state: Readonly<State>, todos: Todo[]) => State;
    todoAppRemoveTodo: (state: Readonly<State>, todo: Todo) => State;
    todoAppClearTodos: (state: Readonly<State>) => State;
    withImportPublishDefault: (state: Readonly<State>, def: Identity<DefaultObject>, isDefault: boolean) => State;
    withImportPublishNormal: (state: Readonly<State>, object: NormalObject, other: OtherObject, otherAbsolute: Absolute<number>) => State;
    yamlSetDefault: (state: Readonly<State>, newDefault: DefaultObject) => State;
    hiddenState: {
        hiddenStateIncreaseCount: (state: Readonly<State>) => State;
    };
    included: {
        includeAddTodo: (state: Readonly<State>, todo: Todo) => State;
        includeAddTwoTodos: (state: Readonly<State>, firstTodo: Todo, secondTodo: Todo) => State;
        includeSetTodos: (state: Readonly<State>, todos: Todo[]) => State;
        includeRemoveTodo: (state: Readonly<State>, todo: Todo) => State;
        includeClearTodos: (state: Readonly<State>) => State;
        hiddenState: {
            includeHiddenStateIncreaseCount: (state: Readonly<State>) => State;
        };
        anotherHiddenState: {
            includeIncreaseCount: (state: Readonly<State>) => State;
        };
        indirectHiddenState: {
            nested: {
                includeIncreaseCount: (state: Readonly<State>) => State;
            };
        };
        aLastHiddenState: {
            includeIncreaseCount: (state: Readonly<State>) => State;
        };
    };
    reducer: {
        reducerSetPage: (state: Readonly<State>, page: PageNumber) => State;
        reducerClearPage: (state: Readonly<State>) => State;
        reducerSetFirstPage: (state: Readonly<State>) => State;
        reducerAdvancePage: (state: Readonly<State>) => State;
        reducerSetOtherPage: (state: Readonly<State>, page: PageNumber) => State;
        reducerSetBothPages: (state: Readonly<State>, page: PageNumber, otherPage: PageNumber) => State;
        reducerOtherAction: (state: Readonly<State>, field: number) => State;
    };
}

export function genCombinedReducer<State>(
    initialState: State,
    callbacks: CombinedReducerCallbacks<State>,
    freeze: (state: State) => State = deepFreeze
): CombinedReducer<State> {
    return (state: Readonly<State> = initialState, action: Readonly<CombinedActions>): State => {
        let freezeFunc = freeze;
        if (process.env.DEVELOPMENT === "true") {
            freezeFunc = (newState: State): State => {
                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);
                return freeze(newState);
            };
        }

        switch (action.type) {
            case COMPLEX_SET_CALLBACK:
                return freezeFunc(callbacks.complexSetCallback(state, action.callback));
            case COMPLEX_SET_MULTIPLE:
                return freezeFunc(callbacks.complexSetMultiple(state, action.choice));
            case COMPLEX_MANY_ARGS:
                return freezeFunc(
                    callbacks.complexManyArgs(
                        state,
                        action.arg1,
                        action.arg2,
                        action.arg3,
                        action.arg4,
                        action.arg5,
                        action.arg6,
                        action.arg7,
                        action.arg8,
                        action.arg9
                    )
                );
            case COMPLEX_ACTION1:
                return freezeFunc(callbacks.complexAction1(state));
            case COMPLEX_ACTION2:
                return freezeFunc(callbacks.complexAction2(state));
            case COMPLEX_ACTION3:
                return freezeFunc(callbacks.complexAction3(state));
            case COMPLEX_ACTION4:
                return freezeFunc(callbacks.complexAction4(state));
            case COMPLEX_ACTION5:
                return freezeFunc(callbacks.complexAction5(state));
            case COMPLEX_ACTION6:
                return freezeFunc(callbacks.complexAction6(state));
            case COMPLEX_ACTION7:
                return freezeFunc(callbacks.complexAction7(state));
            case COMPLEX_ACTION8:
                return freezeFunc(callbacks.complexAction8(state));
            case COMPLEX_ACTION9:
                return freezeFunc(callbacks.complexAction9(state));
            case HIDDEN_STATE___HIDDEN_STATE_INCREASE_COUNT:
                return freezeFunc(callbacks.hiddenState.hiddenStateIncreaseCount(state));
            case INCLUDED___INCLUDE_ADD_TODO:
                return freezeFunc(callbacks.included.includeAddTodo(state, action.todo));
            case INCLUDED___INCLUDE_ADD_TWO_TODOS:
                return freezeFunc(callbacks.included.includeAddTwoTodos(state, action.firstTodo, action.secondTodo));
            case INCLUDED___INCLUDE_SET_TODOS:
                return freezeFunc(callbacks.included.includeSetTodos(state, action.todos));
            case INCLUDED___INCLUDE_REMOVE_TODO:
                return freezeFunc(callbacks.included.includeRemoveTodo(state, action.todo));
            case INCLUDED___INCLUDE_CLEAR_TODOS:
                return freezeFunc(callbacks.included.includeClearTodos(state));
            case INCLUDED__HIDDEN_STATE___INCLUDE_HIDDEN_STATE_INCREASE_COUNT:
                return freezeFunc(callbacks.included.hiddenState.includeHiddenStateIncreaseCount(state));
            case INCLUDED__ANOTHER_HIDDEN_STATE___INCLUDE_INCREASE_COUNT:
                return freezeFunc(callbacks.included.anotherHiddenState.includeIncreaseCount(state));
            case INCLUDED__INDIRECT_HIDDEN_STATE__NESTED___INCLUDE_INCREASE_COUNT:
                return freezeFunc(callbacks.included.indirectHiddenState.nested.includeIncreaseCount(state));
            case INCLUDED__A_LAST_HIDDEN_STATE___INCLUDE_INCREASE_COUNT:
                return freezeFunc(callbacks.included.aLastHiddenState.includeIncreaseCount(state));
            case REDUCER___REDUCER_SET_PAGE:
                return freezeFunc(callbacks.reducer.reducerSetPage(state, action.page));
            case REDUCER___REDUCER_CLEAR_PAGE:
                return freezeFunc(callbacks.reducer.reducerClearPage(state));
            case REDUCER___REDUCER_SET_FIRST_PAGE:
                return freezeFunc(callbacks.reducer.reducerSetFirstPage(state));
            case REDUCER___REDUCER_ADVANCE_PAGE:
                return freezeFunc(callbacks.reducer.reducerAdvancePage(state));
            case REDUCER___REDUCER_SET_OTHER_PAGE:
                return freezeFunc(callbacks.reducer.reducerSetOtherPage(state, action.page));
            case REDUCER___REDUCER_SET_BOTH_PAGES:
                return freezeFunc(callbacks.reducer.reducerSetBothPages(state, action.page, action.otherPage));
            case REDUCER___REDUCER_OTHER_ACTION:
                return freezeFunc(callbacks.reducer.reducerOtherAction(state, action.field));
            case SIMPLE_SET_VALUE:
                return freezeFunc(callbacks.simpleSetValue(state, action.value));
            case SIMPLE_CLEAR_VALUE:
                return freezeFunc(callbacks.simpleClearValue(state));
            case TODO_APP_ADD_TODO:
                return freezeFunc(callbacks.todoAppAddTodo(state, action.todo));
            case TODO_APP_ADD_TWO_TODOS:
                return freezeFunc(callbacks.todoAppAddTwoTodos(state, action.firstTodo, action.secondTodo));
            case TODO_APP_SET_TODOS:
                return freezeFunc(callbacks.todoAppSetTodos(state, action.todos));
            case TODO_APP_REMOVE_TODO:
                return freezeFunc(callbacks.todoAppRemoveTodo(state, action.todo));
            case TODO_APP_CLEAR_TODOS:
                return freezeFunc(callbacks.todoAppClearTodos(state));
            case WITH_IMPORT_PUBLISH_DEFAULT:
                return freezeFunc(callbacks.withImportPublishDefault(state, action.def, action.isDefault));
            case WITH_IMPORT_PUBLISH_NORMAL:
                return freezeFunc(callbacks.withImportPublishNormal(state, action.object, action.other, action.otherAbsolute));
            case YAML_SET_DEFAULT:
                return freezeFunc(callbacks.yamlSetDefault(state, action.newDefault));
            default:
                return freezeFunc(state);
        }
    };
}
