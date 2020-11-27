#!/usr/bin/env node
import Processor from "../processor";

const args = process.argv.slice(1);
const processor = new Processor();
const files: string[] = [];

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--help":
            console.log("Usage:");
            console.log("    gen-redux [--libPath PATH] [FOLDERS...]");
            console.log("");
            console.log("Options:");
            console.log("    --help         Show this help");
            console.log("    --libPath      Specify the location to store the library files for actions and the reducer");
            console.log("");
            console.log("gen-redux searches each folder you specify recursively for redux.json and redux.yml files");
            console.log("and generates redux actions and reducers as specified.");
            process.exit(1);
            break;
        case "--libPath":
            i++;
            let libPath = args[i];
            if (libPath !== undefined) {
                libPath = libPath.replace(/\.ts$/, "");
                processor.setLibPath(libPath, libPath + ".ts");
            }
            break;
        default:
            files.push(args[i]);
            break;
    }
}

processor.processFiles(files);
