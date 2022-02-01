import { exists, mapErrorAsync, readFile, readdir, stat, writeFile } from "./utils";
import { genActions, genLibrary, genReducer } from "./generator";
import { loadFile } from "./definition";

export default class Processor {
    private libPath: string;
    private libFile: string;
    private reactEnabled: boolean;
    private reactModule: string;
    private reactReduxModule: string;
    private maxLineLength: number;

    public constructor() {
        this.libPath = "src/reduxUtils";
        this.libFile = "src/reduxUtils.ts";
        this.reactEnabled = false;
        this.reactModule = "react";
        this.reactReduxModule = "react-redux";
        this.maxLineLength = 160;
    }

    public setLibPath(libPath: string, libFile: string): void {
        this.libPath = libPath;
        this.libFile = libFile;
    }

    public setLibFile(libFile: string): void {
        this.libFile = libFile;
    }

    public setReactEnabled(reactEnabled: boolean): void {
        this.reactEnabled = reactEnabled;
    }

    public setReactModule(reactModule: string): void {
        this.reactModule = reactModule;
    }

    public setReactReduxModule(reactReduxModule: string): void {
        this.reactReduxModule = reactReduxModule;
    }

    public setMaxLineLength(maxLineLength: number): void {
        this.maxLineLength = maxLineLength;
    }

    public async processFiles(entryPoints: string[]): Promise<void> {
        const existingLib = (await exists(this.libFile)) ? await readFile(this.libFile) : null;
        const lib = genLibrary();
        if (existingLib !== lib) {
            await writeFile(this.libFile, lib);
        }

        for (const entryPoint of entryPoints) {
            if (entryPoint.indexOf("node_modules") !== -1) {
                continue;
            }
            await mapErrorAsync(
                () => this.processDir(entryPoint),
                (message) => `Failed to process directory ${entryPoint}: ${message}`
            );
        }
    }

    private async processDir(dir: string): Promise<void> {
        const files = await readdir(dir);
        for (const file of files) {
            const path = `${dir}/${file}`;
            const info = await stat(path);
            if (info.isDirectory()) {
                await this.processDir(path);
            } else if (info.isFile() && (file === "redux.json" || file === "redux.yml")) {
                const prefixParts = dir.split("/");
                const prefix = (prefixParts[prefixParts.length - 1] || "").replace(/[^\w]/g, "");
                const spec = await loadFile(path, undefined, []);
                if (!spec) {
                    continue;
                }
                const { imports, actions, state, reducer, options } = spec;
                if (actions === undefined || Object.keys(actions).length === 0) {
                    continue;
                }
                let reactEnabled = this.reactEnabled;
                let reactModule = this.reactModule;
                let reactReduxModule = this.reactReduxModule;
                let maxLineLength = this.maxLineLength;
                if (options) {
                    if (options.react) {
                        if (options.react.enabled !== undefined) {
                            reactEnabled = options.react.enabled;
                        }
                        if (options.react.modules && options.react.modules.react) {
                            reactModule = options.react.modules.react;
                        }
                        if (options.react.modules && options.react.modules["react-redux"]) {
                            reactReduxModule = options.react.modules["react-redux"];
                        }
                    }
                    if (options.maxLineLength && !Number.isNaN(options.maxLineLength)) {
                        maxLineLength = options.maxLineLength;
                    }
                }
                const actionsSrc = genActions(maxLineLength, this.libPath, prefix, path, (imports && imports.actions) || {}, actions);
                const existingActions = (await exists(`${dir}/actions.ts`)) ? await readFile(`${dir}/actions.ts`) : null;
                if (existingActions !== actionsSrc) {
                    await writeFile(`${dir}/actions.ts`, actionsSrc);
                }
                if (state !== undefined && reducer !== undefined) {
                    const reducerSrc = genReducer(
                        maxLineLength,
                        this.libPath,
                        reactEnabled,
                        reactModule,
                        reactReduxModule,
                        prefix,
                        path,
                        (imports && imports.reducer) || {},
                        actions,
                        state,
                        reducer
                    );
                    const existingReducer = (await exists(`${dir}/reducer.ts`)) ? await readFile(`${dir}/reducer.ts`) : null;
                    if (existingReducer !== reducerSrc) {
                        await writeFile(`${dir}/reducer.ts`, reducerSrc);
                    }
                }
            }
        }
    }
}
