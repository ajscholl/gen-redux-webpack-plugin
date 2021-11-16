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
        internal?: boolean;
    };
}

export interface Reducer {
    [action: string]: "default" | ReduxAction;
}

export interface Imports {
    [file: string]: string | string[];
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

function makeArgs(redux: ReduxAction, separator = ", "): string {
    return Object.keys(redux)
        .map((key) => `${key}: ${redux[key]}`)
        .join(separator);
}

function makeUnlinedArgs(redux: ReduxAction, indent: number): string {
    const indentString = "".padStart(indent);
    return "\n" + indentString + makeArgs(redux, ",\n" + indentString) + "\n" + "".padStart(indent - 4);
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
    values: string | string[];
}

function printImports(maxLineLength: number, importList: Import[]): string[] {
    for (const { values } of importList) {
        if (Array.isArray(values)) {
            values.sort();
        }
    }
    importList.sort(compareImport);

    const result: string[] = [];
    for (const { file, values } of importList) {
        let importValues: string;
        if (Array.isArray(values)) {
            importValues = `{ ${values.join(", ")} }`;
            const resultLine = `import ${importValues} from ${JSON.stringify(file)};`;
            if (resultLine.length > maxLineLength) {
                importValues = ["{", ...values.map((value) => `    ${value},`), "}"].join("\n");
            }
        } else {
            importValues = values;
        }
        result.push(`import ${importValues} from ${JSON.stringify(file)};`);
    }

    return result;
}

function compareString(a: string, b: string): -1 | 0 | 1 {
    const cleanA = a.replace(/[^\w]/g, "");
    const cleanB = b.replace(/[^\w]/g, "");
    return cleanA < cleanB ? -1 : cleanA > cleanB ? 1 : 0;
}

function compareFile(a: string, b: string): -1 | 0 | 1 {
    return compareString(a.replace(/^[./]*/g, ""), b.replace(/^[./]*/g, ""));
}

function compareImport(a: Import, b: Import): -1 | 0 | 1 {
    const aValues = Array.isArray(a.values) ? `{ ${a.values.join(", ")} }` : a.values;
    const bValues = Array.isArray(b.values) ? `{ ${b.values.join(", ")} }` : b.values;
    const isMultipleA = aValues.split(/,/g).length > 1;
    const isMultipleB = bValues.split(/,/g).length > 1;
    if (isMultipleA && isMultipleB) {
        if (a.file === b.file) {
            return compareFile(a.file, b.file);
        }
        return compareString(aValues, bValues);
    }
    if (isMultipleA) {
        return -1;
    }
    if (isMultipleB) {
        return 1;
    }
    if (aValues === bValues) {
        return compareFile(a.file, b.file);
    }
    return compareString(aValues, bValues);
}

export function genActions(maxLineLength: number, libPath: string, prefix: string, path: string, imports: Imports, redux: Redux): string {
    const lines: string[] = [];
    lines.push("// DO NOT EDIT - AUTOMATICALLY GENERATED!");
    lines.push(`// This file is generated from ${path}, edit that file instead.`);
    lines.push("");
    const importList: Import[] = [
        { file: libPath, values: ["Action", "deepFreeze"] },
        ...Object.keys(imports).map((importName) => ({
            file: importName,
            values: imports[importName],
        })),
    ];
    lines.push(...printImports(maxLineLength, importList));
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
    if (actionTypes.join(" | ").length < 140) {
        lines.push(`export type ${makeName(prefix, "Actions")} = ${actionTypes.join(" | ")};`);
    } else {
        lines.push(`export type ${makeName(prefix, "Actions")} =`);
        lines.push(...actionTypes.map((type, index) => `    | ${type}${index === actionTypes.length - 1 ? ";" : ""}`));
    }
    lines.push("");

    for (const key of reduxKeys) {
        let actionFunction = `export function ${makeAction(prefix, key)}Action(${makeArgs(redux[key])}): I${makeName(prefix, key)}Action {`;
        if (actionFunction.length > maxLineLength) {
            actionFunction = `export function ${makeAction(prefix, key)}Action(${makeUnlinedArgs(redux[key], 4)}): I${makeName(prefix, key)}Action {`;
        }
        lines.push(actionFunction);
        lines.push("    return Object.freeze({");
        lines.push(`        type: ${makeType("", key)},`);
        for (const member of Object.keys(redux[key])) {
            lines.push(`        ${member},`);
        }
        lines.push("    });");
        lines.push("}");
        lines.push("");
    }

    lines.push(
        `export type ${makeName(prefix, "Reducer")}<State> = (state: Readonly<State> | undefined, action: Readonly<${makeName(prefix, "Actions")}>) => State;`,
        ""
    );

    lines.push(`export interface ${makeName(prefix, "ReducerCallbacks")}<State> {`);
    for (const key of reduxKeys) {
        const stateArgs = {
            state: "Readonly<State>",
            ...redux[key],
        };
        let callbackLine = `    ${makeAction("", key)}: (${makeArgs(stateArgs)}) => State;`;
        if (callbackLine.length > maxLineLength) {
            callbackLine = `    ${makeAction("", key)}: (${makeUnlinedArgs(stateArgs, 8)}) => State;`;
        }
        lines.push(callbackLine);
    }
    lines.push("}");
    lines.push("");

    let reducerLine = `export function gen${makeName(prefix, "Reducer")}<State>(initialState: State, callbacks: ${makeName(
        prefix,
        "ReducerCallbacks"
    )}<State>, freeze: (state: State) => State = deepFreeze): ${makeName(prefix, "Reducer")}<State> {`;
    if (reducerLine.length > maxLineLength) {
        reducerLine = [
            `export function gen${makeName(prefix, "Reducer")}<State>(`,
            `    initialState: State,`,
            `    callbacks: ${makeName(prefix, "ReducerCallbacks")}<State>,`,
            `    freeze: (state: State) => State = deepFreeze`,
            `): ${makeName(prefix, "Reducer")}<State> {`,
        ].join("\n");
    }
    lines.push(reducerLine);
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
        let funcCall = `                return freezeFunc(callbacks.${makeAction("", key)}(${mergeArgs("state", makePassArgs("action", redux[key]))}));`;
        if (funcCall.length > maxLineLength) {
            funcCall = [
                `                return freezeFunc(`,
                `                    callbacks.${makeAction("", key)}(`,
                `                        ${mergeArgs("state", makePassArgs("action", redux[key])).replace(/ /g, "\n                        ")}`,
                `                    )`,
                `                );`,
            ].join("\n");
        }
        lines.push(funcCall);
    }
    lines.push("            default:");
    lines.push("                return freezeFunc(state);");
    lines.push("        }");
    lines.push("    };");
    lines.push("}");
    lines.push("");

    return lines.join("\n");
}

export function genReducer(
    maxLineLength: number,
    libPath: string,
    reactEnabled: boolean,
    reactModule: string,
    reactReduxModule: string,
    prefix: string,
    path: string,
    imports: Imports,
    actions: Redux,
    state: State,
    reducer: Reducer
): string {
    const lines: string[] = [];
    lines.push("// DO NOT EDIT - AUTOMATICALLY GENERATED!");
    lines.push(`// This file is generated from ${path}, edit that file instead.`);
    lines.push("");
    const actionImports = [`gen${makeName(prefix, "Reducer")}`, ...Object.keys(actions).map((action) => `${makeAction(prefix, action)}Action`)];
    const importList: Import[] = [
        { file: "./actions", values: actionImports },
        { file: libPath, values: ["Dispatch"] },
        ...Object.keys(imports).map((importName) => ({
            file: importName,
            values: imports[importName],
        })),
    ];
    if (reactEnabled) {
        importList.push({ file: reactModule, values: ["ComponentType"] });
        importList.push({ file: reactReduxModule, values: ["connect", "ConnectedComponent", "DistributiveOmit", "GetProps", "Matching"] });
    }
    lines.push(...printImports(maxLineLength, importList));
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
            lines.push(`    ${makeAction(action)}: (state: ${makeName(prefix, "State")}): ${makeName(prefix, "State")} => state,`);
            continue;
        }
        if (reducerConfig === "default") {
            lines.push(
                `    ${makeAction(action)}: (${mergeArgs(`state: ${makeName(prefix, "State")}`, makeArgs(actions[action]))}): ${makeName(
                    prefix,
                    "State"
                )} => ({`,
                `        ...state,`
            );
            for (const stateKey of Object.keys(actions[action])) {
                lines.push(`        ${stateKey},`);
            }
            lines.push(`    }),`);
            continue;
        }
        lines.push(
            `    ${makeAction(action)}: (${mergeArgs(`state: ${makeName(prefix, "State")}`, makeArgs(actions[action]))}): ${makeName(prefix, "State")} => ({`,
            `        ...state,`
        );
        for (const stateKey of Object.keys(reducerConfig)) {
            lines.push(`        ${stateKey}: ${reducerConfig[stateKey]},`);
        }
        lines.push(`    }),`);
    }
    lines.push("});");
    lines.push("");
    lines.push(genMapStateToProps(prefix, state));
    lines.push("");
    lines.push(genMapDispatchToProps(prefix, actions));
    lines.push("");
    if (reactEnabled) {
        lines.push(
            `export function connect${makeName(prefix)}<C extends ComponentType<Matching<${makeName(prefix, "StateProps")} & ${makeName(
                prefix,
                "DispatchProps"
            )}, GetProps<C>>>>(`,
            "    component: C",
            `): ConnectedComponent<C, DistributiveOmit<GetProps<C>, Extract<keyof (${makeName(prefix, "StateProps")} & ${makeName(
                prefix,
                "DispatchProps"
            )}), keyof GetProps<C>>>> {`,
            "    return connect(mapStateToProps, mapDispatchToProps)(component);",
            "}",
            ""
        );
    }

    return lines.join("\n");
}

export function genMapStateToProps(prefix: string, state: State): string {
    const lines: string[] = [];

    lines.push(`export interface ${makeName(prefix, "StateProps")} {`);
    for (const [name, def] of Object.entries(state)) {
        if (!def.internal) {
            lines.push(`    ${name}: ${def.type};`);
        }
    }
    lines.push("}");
    lines.push("");
    lines.push(`export function mapStateToProps(state: ${makeName(prefix, "State")}): ${makeName(prefix, "StateProps")} {`);
    lines.push("    return {");
    for (const [name, def] of Object.entries(state)) {
        if (!def.internal) {
            lines.push(`        ${name}: state.${name},`);
        }
    }
    lines.push("    };");
    lines.push("}");

    return lines.join("\n");
}

export function genMapDispatchToProps(prefix: string, actions: Redux): string {
    const lines: string[] = [];

    lines.push(`export interface ${makeName(prefix, "DispatchProps")} {`);
    for (const [action, payload] of Object.entries(actions)) {
        lines.push(`    ${makeAction(action)}(${makeArgs(payload)}): void;`);
    }
    lines.push("}");
    lines.push("");
    lines.push(`export function mapDispatchToProps(dispatch: Dispatch): ${makeName(prefix, "DispatchProps")} {`);
    lines.push("    return {");
    for (const [action, payload] of Object.entries(actions)) {
        lines.push(
            `        ${makeAction(action)}: (${makeArgs(payload)}): void => dispatch(${makeAction(prefix, action)}Action(${Object.keys(payload).join(", ")})),`
        );
    }
    lines.push("    };");
    lines.push("}");

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
        "export type Dispatch<T = unknown> = (action: Action<T>) => void;",
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
