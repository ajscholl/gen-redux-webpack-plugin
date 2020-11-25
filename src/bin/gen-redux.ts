#!/usr/bin/env node
import Processor from "../processor";

const args = process.argv.slice(1);
const processor = new Processor();
const files: string[] = [];

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--libFile":
            i++;
            if (args[i] !== undefined) {
                processor.setLibPath(args[i], args[i] + ".ts");
            }
            break;
        default:
            files.push(args[i]);
            break;
    }
}

processor.processFiles(files);
