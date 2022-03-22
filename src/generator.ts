import { Imports, Reducer, ReducerDefinition, ReduxAction, ReduxActionField, ReduxActions, State, StateField, formatAccessPath } from "./definition";

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

function capitalize(s: string): string {
    return s === "" ? "" : s.slice(0, 1).toUpperCase() + s.slice(1);
}

function uncapitalize(s: string): string {
    return s === "" ? "" : s.slice(0, 1).toLowerCase() + s.slice(1);
}

function getGroupWords(group: string[], separator: string): string[] {
    if (group.length === 0) {
        return [];
    }

    const groupWords = group.reduce((acc, elem) => {
        acc.push(...getWords(elem), separator);

        return acc;
    }, [] as string[]);

    groupWords.push(separator);

    return groupWords;
}

function makeType(prefix: string, action: ReduxAction): string {
    const words: string[] = ([] as string[]).concat(getGroupWords(action.group, ""), ...[prefix, action.actionName].map(getWords));

    return words.map((word) => word.toUpperCase()).join("_");
}

function makeName(...parts: string[]): string {
    const words: string[] = ([] as string[]).concat(...parts.map(getWords));

    return words.map((word) => capitalize(word.toLowerCase())).join("");
}

function makeActionName(prefix: string, action: ReduxAction, includeGroup = true): string {
    const words: string[] = ([] as string[]).concat(includeGroup ? getGroupWords(action.group, "_") : [], ...[prefix, action.actionName].map(getWords));

    return words.map((word) => capitalize(word.toLowerCase())).join("");
}

function makeAction(prefix: string, action: ReduxAction, includeGroup = true): string {
    return uncapitalize(makeActionName(prefix, action, includeGroup));
}

function makeArgs(fields: ReduxActionField[], separator = ", "): string {
    return fields.map((field) => `${field.name}: ${field.type}`).join(separator);
}

function makeUnlinedArgs(fields: ReduxActionField[], indent: number): string {
    if (fields.length === 0) {
        return "";
    }

    const indentString = "".padStart(indent);

    return "\n" + indentString + makeArgs(fields, ",\n" + indentString) + "\n" + "".padStart(indent - 4);
}

function makePassArgs(container: string, action: ReduxAction): string {
    return action.fields.map((field) => `${container}.${field.name}`).join(", ");
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

export function genActions(maxLineLength: number, libPath: string, prefix: string, path: string, imports: Imports, actions: ReduxActions): string {
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

    const actionsList = Object.values(actions);

    for (const action of actionsList) {
        lines.push(`export const ${makeType("", action)} = ${JSON.stringify(makeType(prefix, action))};`);
    }
    lines.push("");

    for (const action of actionsList) {
        lines.push(`export interface I${makeActionName(prefix, action)}Action extends Action<string> {`);
        lines.push(`    type: typeof ${makeType("", action)};`);
        for (const field of action.fields) {
            lines.push(`    ${field.name}: ${field.type};`);
        }
        lines.push("}");
        lines.push("");
    }

    const actionTypes = actionsList.map((action) => `I${makeActionName(prefix, action)}Action`);
    if (actionTypes.join(" | ").length < 140) {
        lines.push(`export type ${makeName(prefix, "Actions")} = ${actionTypes.join(" | ")};`);
    } else {
        lines.push(`export type ${makeName(prefix, "Actions")} =`);
        lines.push(...actionTypes.map((type, index) => `    | ${type}${index === actionTypes.length - 1 ? ";" : ""}`));
    }
    lines.push("");

    for (const action of actionsList) {
        let actionFunction = `export function ${makeAction(prefix, action)}Action(${makeArgs(action.fields)}): I${makeActionName(prefix, action)}Action {`;
        if (actionFunction.length > maxLineLength) {
            actionFunction = `export function ${makeAction(prefix, action)}Action(${makeUnlinedArgs(action.fields, 4)}): I${makeActionName(
                prefix,
                action
            )}Action {`;
        }
        lines.push(actionFunction);
        lines.push("    return Object.freeze({");
        lines.push(`        type: ${makeType("", action)},`);
        for (const field of action.fields) {
            lines.push(`        ${field.name},`);
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
    {
        const handleGroup = (node: GroupTree<ReduxAction>, groupIndent: string) => {
            for (const action of node.values) {
                const stateArgs: ReduxActionField[] = [
                    {
                        name: "state",
                        type: "Readonly<State>",
                    },
                    ...action.fields,
                ];
                let callbackLine = `${groupIndent}${makeAction("", action, false)}: (${makeArgs(stateArgs)}) => State;`;
                if (callbackLine.length > maxLineLength) {
                    callbackLine = `${groupIndent}${makeAction("", action, false)}: (${makeUnlinedArgs(stateArgs, 8)}) => State;`;
                }
                lines.push(callbackLine);
            }
            for (const subGroup of node.subGroups) {
                lines.push(`${groupIndent}${subGroup.pathElem}: {`);
                handleGroup(subGroup, `${groupIndent}    `);
                lines.push(`${groupIndent}};`);
            }
        };
        handleGroup(toGroupTree(actionsList), "    ");
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
    for (const action of actionsList) {
        lines.push(`            case ${makeType("", action)}:`);
        let funcCall = `                return freezeFunc(callbacks${formatAccessPath(action.group, ".", "")}.${makeAction("", action, false)}(${mergeArgs(
            "state",
            makePassArgs("action", action)
        )}));`;
        if (funcCall.length > maxLineLength) {
            funcCall = [
                `                return freezeFunc(`,
                `                    callbacks${formatAccessPath(action.group, ".", "")}.${makeAction("", action, false)}(`,
                `                        ${mergeArgs("state", makePassArgs("action", action)).replace(/ /g, "\n                        ")}`,
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
    actions: ReduxActions,
    state: State,
    reducer: Reducer
): string {
    const allGroups = getGroups(actions, state, reducer);
    const stateValues = Object.values(state);
    const lines: string[] = [];
    lines.push("// DO NOT EDIT - AUTOMATICALLY GENERATED!");
    lines.push(`// This file is generated from ${path}, edit that file instead.`);
    lines.push("");
    const actionImports = [`gen${makeName(prefix, "Reducer")}`, ...Object.values(actions).map((action) => `${makeAction(prefix, action)}Action`)];
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
        importList.push({
            file: reactReduxModule,
            values: ["connect", "ConnectedComponent", "DistributiveOmit", "GetLibraryManagedProps", "GetProps", "Matching", "Shared"],
        });
    }
    lines.push(...printImports(maxLineLength, importList));
    lines.push("");

    {
        lines.push(`export interface ${makeName(prefix, "State")} {`);
        const initialState: string[] = [];
        const handleGroup = (node: GroupTree<StateField>, groupIndent: string) => {
            for (const field of node.values) {
                lines.push(`${groupIndent}${field.fieldName}: ${field.type};`);
                initialState.push(`${groupIndent}${field.fieldName}: ${field.default},`);
            }
            for (const subGroup of node.subGroups) {
                lines.push(`${groupIndent}${subGroup.pathElem}: {`);
                initialState.push(`${groupIndent}${subGroup.pathElem}: {`);
                handleGroup(subGroup, `${groupIndent}    `);
                lines.push(`${groupIndent}};`);
                initialState.push(`${groupIndent}},`);
            }
        };
        handleGroup(toGroupTree(Object.values(state)), "    ");
        lines.push("}");
        lines.push("");

        lines.push(`const initialState: ${makeName(prefix, "State")} = {`);
        lines.push(...initialState);
        lines.push("};");
        lines.push("");
    }

    lines.push(`export const ${uncapitalize(makeName(prefix, "Reducer"))} = gen${makeName(prefix, "Reducer")}(initialState, {`);
    {
        const handleGroup = (node: GroupTree<ReduxAction>, groupIndent: string) => {
            for (const action of node.values) {
                const reducerConfig: ReducerDefinition | undefined = Object.values(reducer).find(
                    (reducerConfig) => reducerConfig.actionName === action.actionName && isGroupEqual(reducerConfig.group, action.group)
                );
                if (reducerConfig === undefined) {
                    lines.push(`${groupIndent}${makeAction("", action, false)}: (state: ${makeName(prefix, "State")}): ${makeName(prefix, "State")} => state,`);
                    continue;
                }
                lines.push(
                    `${groupIndent}${makeAction("", action, false)}: (${mergeArgs(`state: ${makeName(prefix, "State")}`, makeArgs(action.fields))}): ${makeName(
                        prefix,
                        "State"
                    )} => ({`
                );
                lines.push(`${groupIndent}    ...state,`);
                let subIndent = "    ";
                const groupPath: string[] = [];
                for (const groupElem of action.group) {
                    groupPath.push(groupElem);
                    lines.push(`${groupIndent}${subIndent}${groupElem}: {`, `${groupIndent}    ${subIndent}...state.${groupPath.join(".")},`);
                    subIndent += "    ";
                }
                if (reducerConfig.update === "default") {
                    for (const field of action.fields) {
                        const stateField = stateValues.find(
                            (stateField) => stateField.originalName === field.name && isGroupEqual(stateField.group, action.group)
                        );
                        if (stateField === undefined) {
                            throw new Error(`Failed to find state field for action field ${[...action.group, field.name].join(".")}`);
                        }
                        if (field.name === stateField.fieldName) {
                            lines.push(`${groupIndent}${subIndent}${field.name},`);
                        } else {
                            lines.push(`${groupIndent}${subIndent}${stateField.fieldName}: ${field.name},`);
                        }
                    }
                } else {
                    for (const reducer of Object.values(reducerConfig.update)) {
                        const line = `${groupIndent}${subIndent}${reducer.fieldName}: ${reducer.expression},`;
                        if (line.length > maxLineLength) {
                            lines.push(`${groupIndent}${subIndent}// eslint-disable-next-line prettier/prettier`);
                        }
                        lines.push(line);
                    }
                }
                action.group.forEach(() => {
                    subIndent = subIndent.slice(0, subIndent.length - 4);
                    lines.push(`${groupIndent}${subIndent}},`);
                });
                lines.push(`${groupIndent}}),`);
            }
            for (const subGroup of node.subGroups) {
                lines.push(`${groupIndent}${subGroup.pathElem}: {`);
                handleGroup(subGroup, `${groupIndent}    `);
                lines.push(`${groupIndent}},`);
            }
        };
        handleGroup(toGroupTree(Object.values(actions)), "    ");
    }
    lines.push("});");
    lines.push("");
    for (const group of allGroups) {
        lines.push(genMapStateToProps(prefix, group, state));
        lines.push("");
        lines.push(genMapDispatchToProps(prefix, group, actions, maxLineLength));
        lines.push("");
        if (reactEnabled) {
            const cType = `C extends ComponentType<Matching<${makeName(prefix, ...group, "StateProps")} & ${makeName(
                prefix,
                ...group,
                "DispatchProps"
            )}, GetProps<C>>>`;
            const connectSignature = `export function connect${makeName(prefix, ...group)}<${cType}>(`;
            if (connectSignature.length > maxLineLength) {
                if (cType.length > maxLineLength) {
                    lines.push(
                        `export function connect${makeName(prefix, ...group)}<`,
                        `    C extends ComponentType<`,
                        `        Matching<`,
                        `            ${makeName(prefix, ...group, "StateProps")} & ${makeName(prefix, ...group, "DispatchProps")},`,
                        `            GetProps<C>`,
                        `        >`,
                        `    >`,
                        `>(`
                    );
                } else {
                    lines.push(`export function connect${makeName(prefix, ...group)}<`, `    ${cType}`, `>(`);
                }
            } else {
                lines.push(connectSignature);
            }
            lines.push("    component: C");
            const propsStart = `DistributiveOmit<GetLibraryManagedProps<C>, keyof Shared<${makeName(prefix, ...group, "StateProps")} & ${makeName(
                prefix,
                ...group,
                "DispatchProps"
            )}, GetLibraryManagedProps<C>>> &`;
            const propsEnd = "keyof GetProps<C>";
            const connectedComponentLine = `): ConnectedComponent<C, ${propsStart} ${propsEnd}> {`;
            if (connectedComponentLine.length > maxLineLength) {
                lines.push(`): ConnectedComponent<`, `    C,`);
                const propsLine = `    ${propsStart} ${propsEnd}`;
                if (propsLine.length > maxLineLength) {
                    if (propsStart.length + 4 > maxLineLength) {
                        lines.push(
                            `    DistributiveOmit<`,
                            `        GetLibraryManagedProps<C>,`,
                            `        keyof Shared<${makeName(prefix, ...group, "StateProps")} & ${makeName(
                                prefix,
                                ...group,
                                "DispatchProps"
                            )}, GetLibraryManagedProps<C>>`,
                            `    > &`,
                            `        ${propsEnd}`
                        );
                    } else {
                        lines.push(`    ${propsStart}`, `        ${propsEnd}`);
                    }
                } else {
                    lines.push(propsLine);
                }
                lines.push(`> {`);
            } else {
                lines.push(connectedComponentLine);
            }
            lines.push(`    return connect(map${makeName(...group)}StateToProps, map${makeName(...group)}DispatchToProps)(component);`, "}", "");
        }
    }

    return lines.join("\n");
}

interface Groupable {
    group: string[];
}

interface GroupTree<T> {
    values: T[];
    subGroups: GroupTreeElem<T>[];
}

interface GroupTreeElem<T> extends GroupTree<T> {
    pathElem: string;
}

function toGroupTree<T extends Groupable>(values: T[]): GroupTree<T> {
    const result: GroupTree<T> = {
        values: [],
        subGroups: [],
    };

    const insertAt = (node: GroupTree<T>, value: T, group: string[]): void => {
        const next = group.shift();
        if (next === undefined) {
            node.values.push(value);
            return;
        }

        let nextNode = node.subGroups.find((node) => node.pathElem === next);
        if (nextNode === undefined) {
            nextNode = {
                values: [],
                pathElem: next,
                subGroups: [],
            };
            node.subGroups.push(nextNode);
        }

        insertAt(nextNode, value, group);
    };

    for (const value of values) {
        insertAt(result, value, [...value.group]);
    }

    return result;
}

function getGroups(actions: ReduxActions, state: State, reducer: Reducer): string[][] {
    let groups = Object.values(actions).reduce((acc, action) => {
        if (!acc.some((existing) => isGroupEqual(existing, action.group))) {
            acc.push(action.group);
        }

        return acc;
    }, [] as string[][]);

    groups = Object.values(state).reduce((acc, field) => {
        const group = field.group !== undefined ? field.group.map((entry) => entry || "") : [];

        if (!acc.some((existing) => isGroupEqual(existing, group))) {
            acc.push(group);
        }

        return acc;
    }, groups);

    groups = Object.values(reducer).reduce((acc, reducerConfig) => {
        const group = reducerConfig.group !== undefined ? reducerConfig.group.map((entry) => entry || "") : [];

        if (!acc.some((existing) => isGroupEqual(existing, group))) {
            acc.push(group);
        }

        return acc;
    }, groups);

    return groups.sort((a, b) => {
        const fullA = a.join(".");
        const fullB = b.join(".");

        return fullA > fullB ? 1 : fullA < fullB ? -1 : 0;
    });
}

function genMapStateToProps(prefix: string, group: string[], state: State): string {
    const lines: string[] = [];

    lines.push(`export interface ${makeName(prefix, ...group, "StateProps")} {`);
    for (const def of Object.values(state)) {
        if (!def.internal && isGroupEqual(group, def.group)) {
            lines.push(`    ${def.fieldName}: ${def.type};`);
        }
    }
    lines.push("}");
    lines.push("");
    lines.push(`export function map${makeName(...group)}StateToProps(state: ${makeName(prefix, "State")}): ${makeName(prefix, ...group, "StateProps")} {`);
    lines.push("    return {");
    for (const def of Object.values(state)) {
        if (!def.internal && isGroupEqual(group, def.group)) {
            const groupAccess = (group.length === 0 ? "" : ".") + group.join(".");
            lines.push(`        ${def.fieldName}: state${groupAccess}.${def.fieldName},`);
        }
    }
    lines.push("    };");
    lines.push("}");

    return lines.join("\n");
}

function genMapDispatchToProps(prefix: string, group: string[], actions: ReduxActions, maxLineLength: number): string {
    const lines: string[] = [];

    lines.push(`export interface ${makeName(prefix, ...group, "DispatchProps")} {`);
    for (const action of Object.values(actions)) {
        if (isGroupEqual(action.group, group)) {
            lines.push(`    ${makeAction("", action, false)}(${makeArgs(action.fields)}): void;`);
        }
    }
    lines.push("}");
    lines.push("");
    lines.push(`export function map${makeName(...group)}DispatchToProps(dispatch: Dispatch): ${makeName(prefix, ...group, "DispatchProps")} {`);
    lines.push("    return {");
    for (const action of Object.values(actions)) {
        if (isGroupEqual(action.group, group)) {
            const dispatchDef = `        ${makeAction("", action, false)}: (${makeArgs(action.fields)}): void =>`;
            const dispatchCall = `dispatch(${makeAction(prefix, action)}Action(${action.fields.map((field) => field.name).join(", ")})),`;
            if (dispatchDef.length + dispatchCall.length + 1 > maxLineLength) {
                lines.push(dispatchDef, `            ${dispatchCall}`);
            } else {
                lines.push(`${dispatchDef} ${dispatchCall}`);
            }
        }
    }
    lines.push("    };");
    lines.push("}");

    return lines.join("\n");
}

function isGroupEqual(a: string[], b: (string | undefined)[] | undefined): boolean {
    if (b === undefined) {
        return a.length === 0;
    }

    if (a.length !== b.length) {
        return false;
    }

    return a.every((elem, index) => b[index] === elem);
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
