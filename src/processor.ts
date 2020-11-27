import * as yaml from "yaml";
import { Imports, Reducer, Redux, State, genActions, genLibrary, genReducer } from "./generator";
import { exists, readFile, readdir, stat, writeFile } from "./utils";
import { dirname } from "path";

interface ReduxFile {
    imports?: {
        actions?: Imports;
        reducer?: Imports;
    };
    actions: Redux;
    state?: State;
    reducer?: Reducer;
}

export default class Processor {
    private libPath: string;
    private libFile: string;

    public constructor() {
        this.libPath = "src/reduxUtils";
        this.libFile = "src/reduxUtils.ts";
    }

    public setLibPath(libPath: string, libFile: string): void {
        this.libPath = libPath;
        this.libFile = libFile;
    }

    public async processFiles(entrypoints: string[]): Promise<void> {
        const existingLib = (await exists(this.libFile)) ? await readFile(this.libFile) : null;
        const lib = genLibrary();
        if (existingLib !== lib) {
            await writeFile(this.libFile, lib);
        }

        for (const entrypoint of entrypoints) {
            if (entrypoint.indexOf("node_modules") !== -1) {
                continue;
            }
            try {
                await this.processDir(dirname(entrypoint));
            } catch (error) {
                console.error("Failed to process directory:", entrypoint, error);
            }
        }
    }

    private async loadRedux(path: string): Promise<ReduxFile> {
        const str = await readFile(path);

        return path.endsWith(".yml") ? yaml.parse(str) : JSON.parse(str);
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
                const prefix = prefixParts[prefixParts.length - 1] || "";
                const { imports, actions, state, reducer } = await this.loadRedux(path);
                const actionsSrc = genActions(this.libPath, prefix, path, (imports && imports.actions) || {}, actions);
                const existingActions = (await exists(`${dir}/actions.ts`)) ? await readFile(`${dir}/actions.ts`) : null;
                if (existingActions !== actionsSrc) {
                    await writeFile(`${dir}/actions.ts`, actionsSrc);
                }
                if (state !== undefined && reducer !== undefined) {
                    const reducerSrc = genReducer(prefix, path, (imports && imports.reducer) || {}, actions, state, reducer);
                    const existingReducer = (await exists(`${dir}/reducer.ts`)) ? await readFile(`${dir}/reducer.ts`) : null;
                    if (existingReducer !== reducerSrc) {
                        await writeFile(`${dir}/reducer.ts`, reducerSrc);
                    }
                }
            }
        }
    }
}
