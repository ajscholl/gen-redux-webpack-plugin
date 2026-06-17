import { basename, dirname } from "path";
import { Processor } from ".";

export default class Watcher {
    private processor: Processor;

    public constructor(processor: Processor) {
        this.processor = processor;
    }

    public async run(files: string[]): Promise<void> {
        await this.processor.processFiles(files);
        const chokidar = await import("chokidar");
        chokidar.default
            .watch(files, {
                awaitWriteFinish: {
                    stabilityThreshold: 300,
                },
            })
            .on("all", this.onChange);
    }

    private onChange = async (eventName: string, file: string): Promise<void> => {
        switch (eventName) {
            case "add":
            case "addDir":
            case "change":
                if (basename(file) === "redux.json" || basename(file) === "redux.yml") {
                    const path = dirname(file);
                    console.info(`Detected change in ${path}`);
                    this.processor.processFiles([path]);
                }
                break;
        }
        return;
    };
}
