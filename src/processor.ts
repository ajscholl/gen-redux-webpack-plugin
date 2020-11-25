import * as yaml from "yaml";
import { Imports, Redux, genActions, genLibrary } from "./generator";
import { exists, readFile, readdir, stat, writeFile } from "./utils";
import { dirname } from "path";

interface ReduxFile {
    imports?: {
        actions?: Imports;
    };
    actions: Redux;
}

export default class Processor {
    private libPath = "src/reduxUtils";
    private libFile = "src/reduxUtils.ts";

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
                const { imports, actions } = await this.loadRedux(path);
                const actionsSrc = genActions(this.libPath, prefix, path, (imports && imports.actions) || {}, actions);
                const existingActions = (await exists(`${dir}/actions.ts`)) ? await readFile(`${dir}/actions.ts`) : null;
                if (existingActions !== actionsSrc) {
                    await writeFile(`${dir}/actions.ts`, actionsSrc);
                }
            }
        }
    }
}
