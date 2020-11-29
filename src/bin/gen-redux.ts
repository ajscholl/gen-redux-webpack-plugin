#!/usr/bin/env node
import Processor from "../processor";
import Watcher from "../watcher";
import performInit from "../init";
import { version } from "../version.json";

async function main(): Promise<void> {
    const args = process.argv.slice(2);

    if (args.length >= 1 && args[0] === "--init") {
        const dirs = args.length > 1 ? args.slice(1) : [process.cwd()];
        try {
            await performInit(dirs);
        } catch (error) {
            console.error(error);
            process.exit(2);
        }
        process.exit(0);
    }

    const processor = new Processor();
    const files: string[] = [];
    let watchFiles = false;
    let libFile: string | undefined = undefined;

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case "--help":
                console.error("Usage:");
                console.error("    gen-redux [--libPath PATH] [--libFile PATH] [--watch] [FOLDERS...]");
                console.error("    gen-redux --init [FOLDERS...]");
                console.error("");
                console.error("Options:");
                console.error("    --help         Show this help");
                console.error("    --libPath      Specify the location to import the library files for actions and the reducer from");
                console.error("    --libFile      Specify the location to store the library files for actions and the reducer");
                console.error("    --watch        Continue watching for changes after processing and reprocess files as needed");
                console.error("    --init         Create a stub redux.yml in the current directory or each passed directory");
                console.error("    --version      Print version information");
                console.error("");
                console.error("gen-redux searches each folder you specify recursively for redux.json and redux.yml files");
                console.error("and generates redux actions and reducers as specified.");
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
            case "--init":
                console.error("--init needs to be the first option passed to gen-redux.");
                process.exit(2);
            case "--version":
                console.log(version);
                process.exit(0);
            default:
                files.push(args[i]);
                break;
        }
    }

    if (watchFiles) {
        await new Watcher(processor).run(files);
    } else {
        await processor.processFiles(files);
    }
}

main();
