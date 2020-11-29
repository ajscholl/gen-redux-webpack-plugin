#!/usr/bin/env node
import Processor from "../processor";
import Watcher from "../watcher";

const args = process.argv.slice(1);
const processor = new Processor();
const files: string[] = [];
let watchFiles = false;
let libFile: string | undefined = undefined;

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--help":
            console.log("Usage:");
            console.log("    gen-redux [--libPath PATH] [FOLDERS...]");
            console.log("");
            console.log("Options:");
            console.log("    --help         Show this help");
            console.log("    --libPath      Specify the location to import the library files for actions and the reducer from");
            console.log("    --libFile      Specify the location to store the library files for actions and the reducer");
            console.log("    --watch        Continue watching for changes after processing and reprocess files as needed");
            console.log("");
            console.log("gen-redux searches each folder you specify recursively for redux.json and redux.yml files");
            console.log("and generates redux actions and reducers as specified.");
            process.exit(1);
        case "--libPath":
            i++;
            let libPath = args[i];
            if (libPath !== undefined) {
                libPath = libPath.replace(/\.ts$/, "");
                processor.setLibPath(libPath, libFile !== undefined ? libFile : libPath + ".ts");
            }
            break;
        case "--libFile":
            i++;
            libFile = args[i];
            if (libFile !== undefined) {
                processor.setLibFile(libFile);
            }
            break;
        case "--watch":
            watchFiles = true;
            break;
        default:
            files.push(args[i]);
            break;
    }
}

if (watchFiles) {
    new Watcher(processor).run(files);
} else {
    processor.processFiles(files);
}
