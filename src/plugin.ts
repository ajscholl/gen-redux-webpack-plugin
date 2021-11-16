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
    /** Set to true to generate methods connecting a component with a reducer */
    reactEnabled?: boolean;
    /** Specify the import for react */
    reactModule?: string;
    /** Specify the import for react-redux */
    reactReduxModule?: string;
    /** Maximum line length of the generated code, if lines are longer, the code is broken as needed */
    maxLineLength?: number;
}

export default class GenReduxActionsPlugin {
    private processor: Processor;

    public constructor(options: GenReduxActionsPluginOptions = {}) {
        this.processor = new Processor();
        if (options.libPath) {
            this.processor.setLibPath(options.libPath, options.libFile || `${options.libPath}.ts`);
        }
        if (options.reactEnabled !== undefined) {
            this.processor.setReactEnabled(options.reactEnabled);
        }
        if (options.reactModule) {
            this.processor.setReactModule(options.reactModule);
        }
        if (options.reactReduxModule) {
            this.processor.setReactReduxModule(options.reactReduxModule);
        }
        if (options.maxLineLength) {
            this.processor.setMaxLineLength(options.maxLineLength);
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
