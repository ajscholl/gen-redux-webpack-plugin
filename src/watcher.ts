import * as chokidar from "chokidar";
import { Processor } from ".";

export default class Watcher {
    private processor: Processor;

    public constructor(processor: Processor) {
        this.processor = processor;
    }

    public async run(files: string[]): Promise<void> {
        await this.processor.processFiles(files);
        chokidar
            .watch(files, {
                disableGlobbing: true,
                awaitWriteFinish: {
                    stabilityThreshold: 300,
                },
            })
            .on("all", this.onChange);
    }

    private onChange = async (eventName: "add" | "addDir" | "change" | "unlink" | "unlinkDir", file: string): Promise<void> => {
        switch (eventName) {
            case "add":
            case "addDir":
            case "change":
                if (file.endsWith("/redux.json") || file.endsWith("/redux.yml")) {
                    const path = file.replace(/\/redux\.(json|yml)$/, "");
                    console.error(`Detected change in ${path}`);
                    this.processor.processFiles([path]);
                }
                break;
        }
        return;
    };
}
