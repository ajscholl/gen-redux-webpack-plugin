# gen-redux-webpack-plugin

Generate type-safe redux actions and reducer from a simple JSON or YAML file specification.

- 🔨 Integrated as webpack plugin into your build process
- 🔧 Simple CLI tool to generate the actions if you are not using webpack
- ✔️ Create a reducer easily by providing callbacks for each action
- ❄️ Avoid modifying your state accidentally as the generated reducer automatically freezes your state

## Overview

gen-redux-webpack-plugin processes redux specifications and generates actions
and reducers for you. You can either use it as a webpack plugin or as a command
line utility.

## Installation

You can install gen-redux-webpack-plugin easily with npm:

```shell
npm install gen-redux-webpack-plugin --save-dev
```

## Plugin

The webpack plugin locates redux definitions for you automatically during build time
and generates actions and reducers accordingly. The files are placed into your source
tree after your code has been compiled and you are expected to check them into VCS.
Import the plugin like this:

```ts
import { GenReduxActionsPlugin } from "gen-redux-webpack-plugin";
const { GenReduxActionsPlugin } = require("gen-redux-webpack-plugin");
```

Then create an instance of the plugin and add them to the plugins in your webpack
config:

```ts
new GenReduxActionsPlugin({
    // Options...
});

new GenReduxActionsPlugin({
    libPath: "src/reduxUtils",
    libFile: "src/reduxUtils.ts",
    reactEnabled: false,
    reactModule: "react",
    reactReduxModule: "react-redux",
    maxLineLength: 160,
});
```

The plugin takes six optional options:

- `libPath` specifies the path used to import additional utility functions from.
  It defaults to `"src/reduxUtils"`.
- `libFile` specifies the filepath to generate the utility functions in. It defaults
  to `` `${libPath}.ts` ``.
- `reactEnabled` enables the generation of methods connecting a component with a
  reducer. It defaults to `false`.
- If react is enabled, `reactModule` and `reactReduxModule` specify the names we
  import react and react-redux from. The defaults are `"react"` and `"react-redux"`.
- `maxLineLength` gives the code generator a hint about how to properly format the
  code. It defaults to `160`.

## Command line

You can use `gen-redux` from the command line to generate redux actions by hand
instead of using the webpack plugin. It accepts the following options:

- `--libPath PATH`: Import the library files from this path. Also sets `--libFile`
  if not specified.
- `--libFile PATH`: Write the library files to this path. You also need to specify
  `--libPath` to get the correct import location.
- `--react`: Enables generation of a react-redux style connect function per reducer.
- `--reactModule MODULE`: Overwrite the default react import name.
- `--reactReduxModule MODULE`: Overwrite the default react-redux import name.
- `--maxLineLength LENGTH`: Set the maximum line length of the generated code.
- `--watch`: After processing the specified directories, continue watching them
  for changes and reprocess them as changes occur.

All other arguments are interpreted as dictionaries to process. Each dictionary is
recursively searched for `redux.yml` and `redux.json` files which are then processed.

## Redux file specification

The heart of this plugin is the specification of the redux actions and the reducer.
You can either use JSON or YAML for this task, but we will use YAML here as it allows
adding inline comments and is easier to read. Below you find an example for a simple
TODO app:

```yml
# Add the contents of other files to this file. This will read the file and then
# combine the imports, actions, state, reducer, and options with this file. Imports
# are resolved relative to the included file (so you can include a file from two
# different files and the imports will work correctly). You must not define conflicting
# options, actions, or other fields.
# The included files are assumed to be empty in this example and thus not further
# considered.
include:
  # Either specify the path directly...
  - ./some/other/file.yml
  # Or provide an object with a file and an optional prefix.
  - file: ../this/other/file.json
    # Setting a prefix will rename all actions, state fields, etc., by appending
    # the prefix. This allows you to include the same file twice with a different
    # prefix or merge two otherwise conflicting files.
    prefix: otherFile
    # Setting a group allows you to define a scope for an included file. If you
    # are generating "connect" methods for react, you will get an additional
    # connect method per group which only provides access to the state and actions
    # of that group.
    group: other

# Specify any additional imports you need for your reducer or actions here.
# If you don't need any additional imports, you can skip defining this section.
imports:
  actions:
    # We need to import the type of our Todo so an action can carry a field of
    # that type.
    # This could also be written as ./types: ["Todo"]
    ./types: "{ Todo }"
  reducer:
    # The reducer also needs to import the type. We additionally need to import
    # a sort function to make sure our reducer can produce a consistent ordering.
    # As we can see, imports are defined by specifying the imported module as the
    # key and the imported values as a string (which is included as-is into the
    # generated file).
    ./types: "{ Todo }"
    ./sort: sortTodos

# We need to specify which actions we want to define (otherwise, what is the
# point?). We do this by specifying the action as a key and the data fields of
# the action as the fields of the action. If we don't need any fields (because
# the action itself already describes everything) we can just specify an empty
# object ({}).
actions:
  addTodo:
    todo: Todo
  # Example of an action with two fields:
  addTwoTodos:
    firstTodo: Todo
    secondTodo: Todo
  setTodos:
    todos: Todo[]
  removeTodo:
    todo: Todo
  clearTodos: {}

# Our state of the reducer is quite simple as we only have one field. A more
# complex app might have more fields here quite easily. Each field needs to
# specify the type and default value of it.
state:
  todos:
    type: Todo[]
    default: "[]"
    # Optional attribute for state values we don't want to automatically expose
    # to our components. If specified as true, the generated mapStateToProps method
    # will skip this field.
    internal: false

# Each action needs to be handled by the reducer. We can either set a string of
# code for each field we want to overwrite in the state or let the plugin generate
# a reducer for us.
reducer:
  # We need to specify this action ourselves. We have a variable "state" in scope
  # with the old state of the reducer as well as each field of the action as
  # another variable.
  addTodo:
    todos: "sortTodos([...state.todos, todo])"
  addTwoTodos:
    todos: "sortTodos([...state.todos, firstTodo, secondTodo])"
  # setTodos would only write the variable "todos" from the action to the state,
  # so we can just specify "default" to delegate such work.
  setTodos: default
  removeTodo:
    todos: "state.todos.filter((elem) => elem.id !== todo.id)"
  clearTodos:
    todos: "[]"

# Allows overwriting commandline or plugin (webpack) options per reducer
options:
  react:
    # Enable generation of `connectTodoApp`
    enabled: true
    modules:
      # Overwrite react and react-redux imports. In this case, we don't change them though.
      react: "react"
      react-redux: "react-redux"
  # Set maximum number of characters for the generated files
  maxLineLength: 160
```

This generates two files, `actions.ts` and `reducer.ts`. Let us start with the reducer:

```ts
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
    /* ... */
}

export function mapDispatchToProps(dispatch: Dispatch): TodoAppDispatchProps {
    return {
        addTodo: (todo: Todo): void => dispatch(todoAppAddTodoAction(todo)),
        addTwoTodos: (firstTodo: Todo, secondTodo: Todo): void => dispatch(todoAppAddTwoTodosAction(firstTodo, secondTodo)),
        /* ... */
    };
}

export function connectTodoApp<C extends ComponentType<Matching<TodoAppStateProps & TodoAppDispatchProps, GetProps<C>>>>(
    component: C
): ConnectedComponent<C, DistributiveOmit<GetProps<C>, Extract<keyof (TodoAppStateProps & TodoAppDispatchProps), keyof GetProps<C>>>> {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

```

We can see how our state specification got translated to the `TodoAppState` type
as well as the `initialState`. Next we see that the plugin created an export called
`todoAppReducer` by using the `genTodoAppReducer` function. That function is specified
in `actions.ts` and expects a callback for each of our actions. There we then simply
map the state to a new state, having all fields of our action in scope.

We also see the methods `mapStateToProps`, `mapDispatchToProps`, and `connectTodoApp`.
They allow us to easily expose the whole state and all actions (if we want to) to
a React Component.

Next we look at `actions.ts`:

```ts
export const ADD_TODO = "TODO_APP_ADD_TODO";
export const ADD_TWO_TODOS = "TODO_APP_ADD_TWO_TODOS";
/* ... */

export interface ITodoAppAddTodoAction extends Action<string> {
    type: typeof ADD_TODO;
    todo: Todo;
}

export interface ITodoAppAddTwoTodosAction extends Action<string> {
    type: typeof ADD_TWO_TODOS;
    firstTodo: Todo;
    secondTodo: Todo;
}

/* ... */

export type TodoAppActions = ITodoAppAddTodoAction | ITodoAppAddTwoTodosAction | /* ... */;

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

/* ... */

export type TodoAppReducer<State> = (state: Readonly<State> | undefined, action: Readonly<TodoAppActions>) => State;

export interface TodoAppReducerCallbacks<State> {
    addTodo: (state: Readonly<State>, todo: Todo) => State;
    addTwoTodos: (state: Readonly<State>, firstTodo: Todo, secondTodo: Todo) => State;
    /* ... */
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
            /* ... */
            default:
                return freezeFunc(state);
        }
    };
}
```

The code begins by defining some constants to differentiate our actions, then defines
the actions itself as well as constructor functions for them. At the bottom we also
see `genTodoAppReducer` which allows you to define a reducer for your actions easily
even if you are not generating `reducer.ts` (it is only generated when you specify
`state` and `reducer` in your specification). It expects an object with a reducer function
for each action and returns a reducer for your actions.
