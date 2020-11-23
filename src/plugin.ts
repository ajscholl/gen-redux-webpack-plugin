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

export default class GenReduxActionsPlugin {
    private processor = new Processor();

    public apply(compiler: Compiler): void {
        compiler.hooks.afterEmit.tap("GenReduxActionsPlugin", async (compilation) => {
            const entrypoints = compilation.options.entry;

            if (Array.isArray(entrypoints)) {
                await this.processor.processFiles(entrypoints);
            } else if (typeof entrypoints === "object" && entrypoints !== null) {
                await this.processor.processFiles(Object.keys(entrypoints).map((key) => entrypoints[key]));
            }
        });
    }
}
