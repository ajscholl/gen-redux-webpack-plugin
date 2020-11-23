import { Redux, genActions, genLibrary } from "./generator";
import { exists, readFile, readdir, stat, writeFile } from "./utils";
import { dirname } from "path";

export default class Processor {
    private libPath = "src/reduxUtils";

    public async processFiles(entrypoints: string[]): Promise<void> {
        const libPathFile = `${this.libPath}.ts`;
        const existingLib = (await exists(libPathFile)) ? await readFile(libPathFile) : null;
        const lib = genLibrary();
        if (existingLib !== lib) {
            await writeFile(libPathFile, lib);
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

    private async loadRedux(path: string): Promise<Redux> {
        const str = await readFile(path);

        return JSON.parse(str);
    }

    private async processDir(dir: string): Promise<void> {
        const files = await readdir(dir);
        for (const file of files) {
            const path = `${dir}/${file}`;
            const info = await stat(path);
            if (info.isDirectory()) {
                await this.processDir(path);
            } else if (info.isFile() && file === "redux.json") {
                const prefixParts = dir.split("/");
                const prefix = prefixParts[prefixParts.length - 1] || "";
                const { __imports, ...redux } = await this.loadRedux(path);
                const actions = genActions(this.libPath, prefix, path, __imports || {}, redux);
                const existingActions = (await exists(`${dir}/actions.ts`)) ? await readFile(`${dir}/actions.ts`) : null;
                if (existingActions !== actions) {
                    await writeFile(`${dir}/actions.ts`, actions);
                }
            }
        }
    }
}
