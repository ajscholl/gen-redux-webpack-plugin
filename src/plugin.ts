import Processor from "./processor";

interface Compiler {
    hooks: {
        afterEmit: {
            tap(name: string, callback: (compilation: Compilation) => Promise<void>): void;
        };
    };
}

interface Compilation {
    options: {
        entry:
            | null
            | string[]
            | {
                  [key: string]: string;
              };
    };
}

export interface GenReduxActionsPluginOptions {
    /** Path to import the gen-redux-actions-plugin library from */
    libPath?: string;
    /** Path to write the gen-redux-actions-plugin library to */
    libFile?: string;
}

export default class GenReduxActionsPlugin {
    private processor: Processor;

    public constructor(options: GenReduxActionsPluginOptions = {}) {
        this.processor = new Processor();
        if (options.libPath) {
            this.processor.setLibPath(options.libPath, options.libFile || `${options.libPath}.ts`);
        }
    }

    public apply(compiler: Compiler): void {
        compiler.hooks.afterEmit.tap("GenReduxActionsPlugin", async (compilation) => {
            const entryPoints = compilation.options.entry;

            if (Array.isArray(entryPoints)) {
                await this.processor.processFiles(entryPoints);
            } else if (typeof entryPoints === "object" && entryPoints !== null) {
                await this.processor.processFiles(Object.keys(entryPoints).map((key) => entryPoints[key]));
            }
        });
    }
}
