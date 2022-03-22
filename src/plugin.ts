import { Compiler, EntryNormalized } from "webpack";
import Processor from "./processor";
import { dirname } from "path";

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
            const entry: EntryNormalized = compilation.options.entry;
            const entryPoints = typeof entry === "function" ? await entry() : entry;
            const directories = ([] as string[]).concat(...Object.values(entryPoints).map((entryPoint) => (entryPoint.import || []).map(dirname)));

            await this.processor.processFiles(directories);
        });
    }
}
