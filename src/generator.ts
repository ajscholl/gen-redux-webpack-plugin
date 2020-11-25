export interface Redux {
    [action: string]: ReduxAction;
}

export interface ReduxAction {
    [field: string]: string;
}

export interface State {
    [field: string]: {
        type: string;
        default: string;
    };
}

export interface Reducer {
    [action: string]: "default" | ReduxAction;
}

export interface Imports {
    [file: string]: string;
}

function getWords(camelCase: string): string[] {
    if (camelCase === "") {
        return [];
    }

    const result: string[] = [];

    const [first, ...split] = camelCase.split(/([A-Z])/g);
    if (first !== "") {
        result.push(first);
    }

    for (let i = 0; i < split.length; i += 2) {
        result.push(`${split[i]}${split[i + 1]}`);
    }

    return result;
}

function makeType(...parts: string[]): string {
    const words: string[] = ([] as string[]).concat(...parts.map(getWords));

    return words.map((word) => word.toUpperCase()).join("_");
}

function makeName(...parts: string[]): string {
    const words: string[] = ([] as string[]).concat(...parts.map(getWords));

    return words.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()).join("");
}

function makeAction(...parts: string[]): string {
    const name = makeName(...parts);

    return name.slice(0, 1).toLowerCase() + name.slice(1);
}

function makeArgs(redux: ReduxAction): string {
    return Object.keys(redux)
        .map((key) => `${key}: ${redux[key]}`)
        .join(", ");
}

function makePassArgs(action: string, redux: ReduxAction): string {
    return Object.keys(redux)
        .map((key) => `${action}.${key}`)
        .join(", ");
}

function mergeArgs(...args: string[]): string {
    return args.filter((arg) => arg !== "").join(", ");
}

interface Import {
    file: string;
    values: string;
}

function compareString(a: string, b: string): -1 | 0 | 1 {
    const cleanA = a.replace(/[^\w]/g, "");
    const cleanB = b.replace(/[^\w]/g, "");
    return cleanA < cleanB ? -1 : cleanA > cleanB ? 1 : 0;
}

function compareImport(a: Import, b: Import): -1 | 0 | 1 {
    const isMultipleA = a.values.split(/,/g).length > 1;
    const isMultipleB = b.values.split(/,/g).length > 1;
    if (isMultipleA && isMultipleB) {
        if (a.values === b.values) {
            return compareString(a.file, b.file);
        }
        return compareString(a.values, b.values);
    }
    if (isMultipleA) {
        return -1;
    }
    if (isMultipleB) {
        return 1;
    }
    if (a.values === b.values) {
        return compareString(a.file, b.file);
    }
    return compareString(a.values, b.values);
}

export function genActions(libPath: string, prefix: string, path: string, imports: Imports, redux: Redux): string {
    const lines: string[] = [];
    lines.push("// DO NOT EDIT - AUTOMATICALLY GENERATED!");
    lines.push(`// This file is generated from ${path}, edit that file instead.`);
    lines.push("");
    const importList: Import[] = [
        { file: libPath, values: "{ Action, deepFreeze }" },
        ...Object.keys(imports).map((importName) => ({
            file: importName,
            values: imports[importName],
        })),
    ];
    importList.sort(compareImport);
    for (const { file, values } of importList) {
        lines.push(`import ${values} from ${JSON.stringify(file)};`);
    }
    lines.push("");

    const reduxKeys = Object.keys(redux);

    for (const key of reduxKeys) {
        lines.push(`export const ${makeType("", key)} = ${JSON.stringify(makeType(prefix, key))};`);
    }
    lines.push("");

    for (const key of reduxKeys) {
        lines.push(`export interface I${makeName(prefix, key)}Action extends Action<string> {`);
        lines.push(`    type: typeof ${makeType("", key)};`);
        for (const member of Object.keys(redux[key])) {
            lines.push(`    ${member}: ${redux[key][member]};`);
        }
        lines.push("}");
        lines.push("");
    }

    const actionTypes = reduxKeys.map((key) => `I${makeName(prefix, key)}Action`);
    if (actionTypes.join(" | ").length < 120) {
        lines.push(`export type ${makeName(prefix, "Actions")} = ${actionTypes.join(" | ")};`);
    } else {
        lines.push(`export type ${makeName(prefix, "Actions")} =`);
        lines.push(...actionTypes.map((type, index) => `    | ${type}${index === actionTypes.length - 1 ? ";" : ""}`));
    }
    lines.push("");

    for (const key of reduxKeys) {
        lines.push(`export function ${makeAction(prefix, key)}Action(${makeArgs(redux[key])}): I${makeName(prefix, key)}Action {`);
        lines.push("    return Object.freeze({");
        lines.push(`        type: ${makeType("", key)},`);
        for (const member of Object.keys(redux[key])) {
            lines.push(`        ${member},`);
        }
        lines.push("    });");
        lines.push("}");
        lines.push("");
    }

    lines.push(`export type ${makeName(prefix, "Reducer")}<State> = (state: Readonly<State> | undefined, action: Readonly<${makeName(prefix, "Actions")}>) => State;`);
    lines.push("");

    lines.push(`export interface ${makeName(prefix, "ReducerCallbacks")}<State> {`);
    for (const key of reduxKeys) {
        lines.push(`    ${makeAction("", key)}: (${mergeArgs("state: Readonly<State>", makeArgs(redux[key]))}) => State;`);
    }
    lines.push("}");
    lines.push("");

    lines.push(
        `export function gen${makeName(prefix, "Reducer")}<State>(initialState: State, callbacks: ${makeName(
            prefix,
            "ReducerCallbacks"
        )}<State>, freeze: (state: State) => State = deepFreeze): ${makeName(prefix, "Reducer")}<State> {`
    );
    lines.push(`    return (state: Readonly<State> = initialState, action: Readonly<${makeName(prefix, "Actions")}>): State => {`);

    lines.push("        let freezeFunc = freeze;");
    lines.push(`        if (process.env.DEVELOPMENT === "true") {`);
    lines.push("            freezeFunc = (newState: State): State => {");
    lines.push(`                console.debug("Reducing action", action.type, action, "state", state, "new state", newState);`);
    lines.push("                return freeze(newState);");
    lines.push("            };");
    lines.push("        }");
    lines.push("");

    lines.push("        switch (action.type) {");
    for (const key of reduxKeys) {
        lines.push(`            case ${makeType("", key)}:`);
        lines.push(`                return freezeFunc(callbacks.${makeAction("", key)}(${mergeArgs("state", makePassArgs("action", redux[key]))}));`);
    }
    lines.push("            default:");
    lines.push("                return freezeFunc(state);");
    lines.push("        }");
    lines.push("    };");
    lines.push("}");
    lines.push("");

    return lines.join("\n");
}

export function genReducer(prefix: string, path: string, imports: Imports, actions: Redux, state: State, reducer: Reducer): string {
    const lines: string[] = [];
    lines.push("// DO NOT EDIT - AUTOMATICALLY GENERATED!");
    lines.push(`// This file is generated from ${path}, edit that file instead.`);
    lines.push("");
    const importList: Import[] = [
        { file: "./actions", values: `{ gen${makeName(prefix, "Reducer")} }` },
        ...Object.keys(imports).map((importName) => ({
            file: importName,
            values: imports[importName],
        })),
    ];
    importList.sort(compareImport);
    for (const { file, values } of importList) {
        lines.push(`import ${values} from ${JSON.stringify(file)};`);
    }
    lines.push("");

    lines.push(`export interface ${makeName(prefix, "State")} {`);
    for (const field of Object.keys(state)) {
        lines.push(`    ${field}: ${state[field].type};`);
    }
    lines.push("}");
    lines.push("");

    lines.push(`const initialState: ${makeName(prefix, "State")} = {`);
    for (const field of Object.keys(state)) {
        lines.push(`    ${field}: ${state[field].default},`);
    }
    lines.push("};");
    lines.push("");

    lines.push(`export const ${makeAction(prefix, "Reducer")} = gen${makeName(prefix, "Reducer")}(initialState, {`);
    for (const action of Object.keys(actions)) {
        const reducerConfig: "default" | ReduxAction | undefined = reducer[action];
        if (reducerConfig === undefined) {
            lines.push(`    ${makeAction(action)}: (state) => state,`);
            continue;
        }
        if (reducerConfig === "default") {
            lines.push(`    ${makeAction(action)}: (${mergeArgs("state", makeArgs(actions[action]))}) => ({`);
            lines.push(`        ...state,`);
            for (const stateKey of Object.keys(actions[action])) {
                lines.push(`        ${stateKey},`);
            }
            lines.push(`    }),`);
            continue;
        }
        lines.push(`    ${makeAction(action)}: (${mergeArgs("state", makeArgs(actions[action]))}) => ({`);
        lines.push(`        ...state,`);
        for (const stateKey of Object.keys(reducerConfig)) {
            lines.push(`        ${stateKey}: ${reducerConfig[stateKey]},`);
        }
        lines.push(`    }),`);
    }
    lines.push("});");
    lines.push("");

    return lines.join("\n");
}

export function genLibrary(): string {
    return [
        "// DO NOT EDIT - AUTOMATICALLY GENERATED!",
        "// This file is generated by gen-redux-webpack-plugin.",
        "",
        "export interface Action<T> {",
        "    type: T;",
        "}",
        "",
        "const objPrototype = Object.getPrototypeOf({});",
        "",
        "export function deepFreeze<S>(obj: S): S {",
        `    if (typeof obj !== "object" || obj === null) {`,
        "        return obj;",
        "    }",
        "",
        "    if (Array.isArray(obj) && !Object.isFrozen(obj)) {",
        "        for (let i = 0; i < obj.length; i++) {",
        "            obj[i] = deepFreeze(obj[i]);",
        "        }",
        "    } else if (Object.isFrozen(obj) || Object.getPrototypeOf(obj) !== objPrototype) {",
        "        return obj;",
        "    } else {",
        "        for (const k in obj) {",
        "            obj[k] = deepFreeze(obj[k]);",
        "        }",
        "    }",
        "",
        "    return Object.freeze(obj);",
        "}",
        "",
    ].join("\n");
}
