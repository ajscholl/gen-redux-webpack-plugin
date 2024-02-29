import * as path from "path";
import * as yaml from "yaml";
import * as yup from "yup";
import { mapError, readFile } from "./utils";
import Lazy from "yup/lib/Lazy";

interface ParsedReduxActionFields {
    [field: string]: string;
}

export interface ReduxActionField {
    name: string;
    type: string;
}

const reduxActionFieldsSchema: Lazy<yup.SchemaOf<ParsedReduxActionFields>> = yup.lazy((value: unknown): yup.SchemaOf<ParsedReduxActionFields> => {
    const schema = Object.keys(value && typeof value === "object" ? value : {}).reduce(
        (acc, field: keyof ParsedReduxActionFields) =>
            acc.shape({
                [field]: yup.string().required("A field for an action needs a type"),
            }),
        yup.object({}) as yup.SchemaOf<ParsedReduxActionFields>
    );

    return schema.required("An action needs to have fields, if you don't want to specify any fields, use an empty object instead");
});

interface ParsedReduxActions {
    [action: string]: ParsedReduxActionFields;
}

export interface ReduxAction {
    fields: ReduxActionField[];
    originalName: string;
    actionName: string;
    group: string[];
}

export interface ReduxActions {
    [action: string]: ReduxAction;
}

const reduxSchema: Lazy<yup.SchemaOf<ParsedReduxActions>> = yup.lazy((value: unknown): yup.SchemaOf<ParsedReduxActions> => {
    return Object.keys(value && typeof value === "object" ? value : {}).reduce(
        (acc, field: keyof ParsedReduxActions) =>
            acc.shape({
                [field]: reduxActionFieldsSchema,
            }),
        yup.object({}) as yup.SchemaOf<ParsedReduxActions>
    );
});

interface ParsedStateField {
    type: string;
    default: string;
    internal?: boolean;
}

export interface StateField extends ParsedStateField {
    originalName: string;
    fieldName: string;
    group: string[];
}

const stateFieldSchema: yup.SchemaOf<ParsedStateField> = yup
    .object({
        type: yup.string().required("Please define the type for each field"),
        default: yup.string().required("Please give a default for each field"),
        internal: yup.boolean(),
    })
    .required("Please provide a defintion for each state field");

interface ParsedReduxStateUpdate {
    [field: string]: string;
}

const reduxStateUpdateSchema: Lazy<yup.SchemaOf<ParsedReduxStateUpdate>> = yup.lazy((value: unknown): yup.SchemaOf<ParsedReduxStateUpdate> => {
    const schema = Object.keys(value && typeof value === "object" ? value : {}).reduce(
        (acc, field: keyof ParsedReduxStateUpdate) =>
            acc.shape({
                [field]: yup.string().required("A field for an action needs a type"),
            }),
        yup.object({}) as yup.SchemaOf<ParsedReduxStateUpdate>
    );

    return schema.required("An state update needs to have fields, if you don't want to update any fields, use an empty object instead");
});

export interface ReduxStateUpdate {
    [field: string]: {
        fieldName: string;
        expression: string;
    };
}

interface ParsedState {
    [field: string]: ParsedStateField;
}

export interface State {
    [field: string]: StateField;
}

const stateSchema: Lazy<yup.SchemaOf<ParsedState>> = yup.lazy(
    (value: unknown): yup.SchemaOf<ParsedState> =>
        Object.keys(value && typeof value === "object" ? value : {}).reduce(
            (acc, field: keyof ParsedState) =>
                acc.shape({
                    [field]: stateFieldSchema,
                }),
            yup.object({}) as yup.SchemaOf<ParsedState>
        )
);

interface ParsedReducer {
    [action: string]: "default" | ParsedReduxStateUpdate;
}

function mkReducerSchema(fieldValue: unknown): yup.StringSchema | Lazy<yup.SchemaOf<ParsedReduxStateUpdate>> {
    return fieldValue === "default" ? yup.string().oneOf(["default"]).required() : reduxStateUpdateSchema;
}

const reducerSchema: Lazy<yup.SchemaOf<ParsedReducer>> = yup.lazy(
    (value: unknown): yup.SchemaOf<ParsedReducer> =>
        Object.keys(value && typeof value === "object" ? value : {}).reduce(
            (acc: yup.SchemaOf<ParsedReducer>, field: keyof ParsedReducer): yup.SchemaOf<ParsedReducer> => {
                const fieldSchema: Lazy<yup.AnySchema> = yup.lazy(mkReducerSchema as unknown as (fieldValue: unknown) => yup.AnySchema);

                return acc.shape({
                    [field]: fieldSchema as unknown as yup.AnySchema,
                });
            },
            yup.object({}) as yup.SchemaOf<ParsedReducer>
        )
);

export interface ReducerDefinition {
    actionName: string;
    group: string[];
    update: "default" | ReduxStateUpdate;
}

export interface Reducer {
    [action: string]: ReducerDefinition;
}

export interface Imports {
    [file: string]: string | string[];
}

function mkImportsSchema(fieldValue: unknown): yup.SchemaOf<string | string[]> {
    return typeof fieldValue === "string"
        ? yup.string().required("Please specify the types to import")
        : yup.array(yup.string().required("Please specify a type to import")).required("Please specify the types to import");
}

const importsSchema = yup.lazy(
    (value: unknown): yup.SchemaOf<Imports> =>
        Object.keys(value && typeof value === "object" ? value : {}).reduce(
            (acc: yup.SchemaOf<Imports>, field: keyof Imports): yup.SchemaOf<Imports> => {
                const fieldSchema: Lazy<yup.AnySchema> = yup.lazy(mkImportsSchema as unknown as (fieldValue: unknown) => yup.AnySchema);

                return acc.shape({
                    [field]: fieldSchema as unknown as yup.AnySchema,
                });
            },
            yup.object({}) as yup.SchemaOf<Imports>
        )
);

export interface ReduxOptions {
    react?: {
        enabled?: boolean;
        modules?: {
            react?: string;
            "react-redux"?: string;
        };
    };
    maxLineLength?: number;
}

const optionsSchema = yup.object({
    react: yup.object({
        enabled: yup.boolean(),
        modules: yup.object({
            react: yup.string(),
            "react-redux": yup.string(),
        }),
    }),
    maxLineLength: yup.number(),
});

export interface IncludeWithOptions {
    file: string;
    prefix?: string;
    group?: string;
}

const includeSchema = yup.array(
    yup.lazy((value: unknown) =>
        typeof value === "string"
            ? yup.string().required("Please specify the file to import")
            : yup
                  .object({
                      file: yup.string().required("Please specify the file to import"),
                      prefix: yup.string(),
                      group: yup.string(),
                  })
                  .required("Please specify the import")
    )
);

interface ParsedReduxFile {
    imports?: {
        actions?: Imports;
        reducer?: Imports;
    };
    actions?: ParsedReduxActions;
    state?: ParsedState;
    reducer?: ParsedReducer;
    options?: ReduxOptions;
}

export interface ReduxFile {
    imports: {
        actions: Imports;
        reducer: Imports;
    };
    actions: ReduxActions;
    state?: State;
    reducer?: Reducer;
    options: ReduxOptions;
}

const reduxFileSchema: yup.SchemaOf<ParsedReduxFile> = yup
    .object({
        imports: yup.object({
            actions: importsSchema as unknown as yup.AnyObjectSchema,
            reducer: importsSchema as unknown as yup.AnyObjectSchema,
        }),
        actions: reduxSchema as unknown as yup.AnyObjectSchema,
        state: stateSchema as unknown as yup.AnyObjectSchema,
        reducer: reducerSchema as unknown as yup.AnyObjectSchema,
        options: optionsSchema,
    })
    .required("Please define a redux file")
    .strict();

interface ParsedReduxFileWithIncludes extends ParsedReduxFile {
    include?: (string | IncludeWithOptions)[];
}

const reduxFileWithIncludesSchema: yup.SchemaOf<ParsedReduxFileWithIncludes> = reduxFileSchema.clone().shape({
    include: includeSchema as unknown as yup.AnyObjectSchema,
});

export async function loadFile(fileName: string, prefix: string | undefined, group: string[]): Promise<ReduxFile> {
    const str = await readFile(fileName);
    const parsed: unknown = fileName.endsWith(".yml") ? yaml.parse(str) : JSON.parse(str);
    const file: ParsedReduxFileWithIncludes = await reduxFileWithIncludesSchema.validate(parsed);

    const { include: includes, ...fileContent } = file;
    let result: ReduxFile = fromParsedReduxFile(fileContent, prefix, group);

    if (includes !== undefined) {
        for (let include of includes) {
            if (typeof include === "string") {
                include = {
                    file: include,
                };
            }
            const basePath = path.dirname(fileName);
            const fullPath = path.join(basePath, include.file);
            const mergedGroup = include.group !== undefined ? [...group, include.group] : group;
            const mergedPrefix = include.prefix === undefined ? prefix : mergeKey(prefix, include.prefix);
            const loaded = await loadFile(fullPath, mergedPrefix, mergedGroup);
            const includeFile = include.file;
            mapError(
                () => {
                    result = merge(result, loaded, path.dirname(includeFile));
                },
                (message) => `${message} - while merging ${includeFile} into ${fileName}`
            );
        }
    }

    return result;
}

function fromParsedReduxFile(parsed: ParsedReduxFile, prefix: string | undefined, group: string[]): ReduxFile {
    const actions = Object.entries(parsed.actions || {}).reduce((acc, [action, fields]) => {
        acc[`${group.join(".")} ${mergeKey(prefix, action)}`] = {
            fields: Object.entries(fields).map(([name, type]) => ({
                name,
                type,
            })),
            originalName: action,
            actionName: mergeKey(prefix, action),
            group,
        };

        return acc;
    }, {} as ReduxActions);
    const state =
        parsed.state === undefined
            ? undefined
            : Object.entries(parsed.state).reduce((acc, [field, def]) => {
                  acc[`${group.join(".")} ${mergeKey(prefix, field)}`] = {
                      default: def.default,
                      type: def.type,
                      originalName: field,
                      fieldName: mergeKey(prefix, field),
                      internal: def.internal,
                      group,
                  };

                  return acc;
              }, {} as State);
    const groupAccess = formatAccessPath(group, ".", "");
    const reducer =
        parsed.reducer === undefined
            ? undefined
            : Object.entries(parsed.reducer).reduce((acc, [action, update]) => {
                  const newUpdate =
                      update === "default"
                          ? "default"
                          : Object.entries(update).reduce((acc, [field, expression]) => {
                                acc[`${group.join(".")} ${mergeKey(prefix, field)}`] = {
                                    fieldName: mergeKey(prefix, field),
                                    expression: expression.replace(
                                        /\bstate\.([\w_$][\w\d_$]*)\b/g,
                                        (_: string, identifier: string): string => `state${groupAccess}.${mergeKey(prefix, identifier)}`
                                    ),
                                };
                                return acc;
                            }, {} as ReduxStateUpdate);
                  acc[`${group.join(".")} ${mergeKey(prefix, action)}`] = {
                      actionName: mergeKey(prefix, action),
                      group,
                      update: newUpdate,
                  };

                  return acc;
              }, {} as Reducer);

    return {
        imports: {
            actions: parsed.imports?.actions || {},
            reducer: parsed.imports?.reducer || {},
        },
        actions,
        state,
        reducer,
        options: parsed.options || {},
    };
}

function merge(base: ReduxFile, toMerge: ReduxFile, relativePath: string): ReduxFile {
    const mergedOptions: ReduxOptions = base.options;
    const { options } = toMerge;
    if (options.react !== undefined) {
        const { react } = options;
        if (react.enabled !== undefined) {
            if (mergedOptions.react?.enabled !== undefined && mergedOptions.react.enabled !== react.enabled) {
                throw new Error(`Conflicting settings for options.react.enabled: ${mergedOptions.react.enabled} and ${react.enabled}`);
            } else {
                mergedOptions.react = mergedOptions.react || {};
                mergedOptions.react.enabled = react.enabled;
            }
        }
        if (react.modules !== undefined) {
            const { modules } = react;
            if (mergedOptions.react?.modules?.react !== undefined && mergedOptions.react.modules.react !== modules.react) {
                throw new Error(`Conflicting settings for options.react.modules.react: ${mergedOptions.react.modules.react} and ${modules.react}`);
            } else {
                mergedOptions.react = mergedOptions.react || {};
                mergedOptions.react.modules = mergedOptions.react.modules || {};
                mergedOptions.react.modules.react = modules.react;
            }
            if (mergedOptions.react?.modules?.["react-redux"] !== undefined && mergedOptions.react.modules["react-redux"] !== modules["react-redux"]) {
                throw new Error(
                    `Conflicting settings for options.react.modules.react-redux: ${mergedOptions.react.modules["react-redux"]} and ${react.modules["react-redux"]}`
                );
            } else {
                mergedOptions.react = mergedOptions.react || {};
                mergedOptions.react.modules = mergedOptions.react.modules || {};
                mergedOptions.react.modules["react-redux"] = modules["react-redux"];
            }
        }
    }
    if (options.maxLineLength !== undefined) {
        if (mergedOptions.maxLineLength !== undefined && mergedOptions.maxLineLength !== options.maxLineLength) {
            throw new Error(`Conflicting settings for options.maxLineLength: ${mergedOptions.maxLineLength} and ${options.maxLineLength}`);
        } else {
            mergedOptions.maxLineLength = options.maxLineLength;
        }
    }

    return {
        imports: {
            actions: mergeImports(base.imports.actions, toMerge.imports.actions, relativePath),
            reducer: mergeImports(base.imports.reducer, toMerge.imports.reducer, relativePath),
        },
        actions: mergeAny("actions", base.actions, toMerge.actions),
        state: base.state === undefined && toMerge.state === undefined ? undefined : mergeAny("state", base.state || {}, toMerge.state || {}),
        reducer: base.reducer === undefined && toMerge.reducer === undefined ? undefined : mergeAny("reducer", base.reducer || {}, toMerge.reducer || {}),
        options: mergedOptions,
    };
}

function mergeImports(baseImports: Imports, newImports: Imports, relativePath: string): Imports {
    const imports: Imports = {
        ...baseImports,
    };

    return Object.entries(newImports).reduce((acc, [from, imported]) => {
        const newFrom = makeRelativeImport(from, relativePath);
        if (acc[newFrom] === undefined) {
            acc[newFrom] = imported;
        } else {
            const existing = acc[newFrom];
            if (Array.isArray(existing) && Array.isArray(imported)) {
                imported.forEach((importedValue) => {
                    if (!existing.includes(importedValue)) {
                        existing.push(importedValue);
                    }
                });
            } else if (typeof existing === "string" && typeof imported === "string") {
                if (existing === imported) {
                    return acc;
                }

                throw new Error(`Conflicting imports of ${existing} and ${imported} from ${from}`);
            } else {
                throw new Error(`Don't know how to combine imports ${JSON.stringify(existing)} and ${JSON.stringify(imported)} from ${from}`);
            }
        }

        return acc;
    }, imports);
}

function makeRelativeImport(importPath: string, relativePath: string): string {
    if (!importPath.startsWith(".")) {
        return importPath;
    }

    const mergedPath = path.join(relativePath, importPath);
    if (!mergedPath.startsWith(".")) {
        return `./${mergedPath}`;
    }

    return mergedPath;
}

type Mapped<T> = {
    [key: string]: T;
};

function mergeAny<T>(what: string, first: Mapped<T>, second: Mapped<T>): Mapped<T> {
    return Object.entries(second).reduce(
        (acc, [key, value]) => {
            if (acc[key] !== undefined) {
                throw new Error(`Duplicate ${what} key "${key}" when merging files`);
            }
            acc[key] = value;

            return acc;
        },
        {
            ...first,
        }
    );
}

function mergeKey(prefix: string | undefined, key: string): string {
    if (prefix === undefined) {
        return key;
    }

    return `${prefix}${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;
}

export function formatAccessPath(group: string[], nonEmptyPrefix: "." | "", nonEmptySuffix: "." | ""): string {
    if (group.length === 0) {
        return "";
    }

    return `${nonEmptyPrefix}${group.join(".")}${nonEmptySuffix}`;
}
