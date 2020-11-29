import * as readline from "readline";
import * as yaml from "yaml";
import { exists, writeFile } from "./utils";

enum Format {
    JSON = "json",
    YAML = "yaml",
}

function getTemplate(includeReducer: boolean, format: Format): string {
    const lines: string[] = [];

    lines.push("imports:");
    lines.push("  actions:");
    lines.push(`    # path/to/package: "{ Name, OtherName }"`);
    if (includeReducer) {
        lines.push("  reducer:");
        lines.push(`    # path/to/package: "{ Name, OtherName }"`);
    }
    lines.push("");
    lines.push("actions:");
    lines.push("  # setSomething:");
    lines.push("    # field1: string");
    lines.push("    # field2: number");
    lines.push("  # addSomething: {}");
    if (includeReducer) {
        lines.push("");
        lines.push("state:");
        lines.push("  # field1:");
        lines.push("    # type: string");
        lines.push(`    # default: '""'`);
        lines.push("  # field2:");
        lines.push("    # type: number");
        lines.push(`    # default: "0"`);
        lines.push("");
        lines.push("reducer:");
        lines.push("  # setSomething: default");
        lines.push("  # addSomething:");
        lines.push(`    # field2: "state.field2 + 1"`);
    }

    lines.push("");

    const yml = lines.join("\n");

    switch (format) {
        case Format.JSON:
            return JSON.stringify(yaml.parse(yml), undefined, 4) + "\n";
        case Format.YAML:
            return yml;
    }
}

export default async function performInit(dirs: string[]): Promise<void> {
    let linePromise: ((line: string) => void) | null = null;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on("line", (line) => {
        if (linePromise) {
            const resolve = linePromise;
            linePromise = null;
            resolve(line.trim());
        }
    });

    const getLine = (prompt: string): Promise<string> => {
        rl.setPrompt(prompt);
        rl.prompt();
        return new Promise<string>((resolve) => {
            linePromise = resolve;
        });
    };

    for (const dir of dirs) {
        let format: Format | null = null;
        while (format === null) {
            const line = await getLine(`Format for ${dir} [YAML|json]? `);
            switch (line.toLowerCase()) {
                case "yaml":
                case "yml":
                case "":
                    format = Format.YAML;
                    break;
                case "json":
                    format = Format.JSON;
                    break;
                default:
                    console.log("Please specify yaml or json.");
                    break;
            }
        }
        let includeReducer: boolean | null = null;
        while (includeReducer === null) {
            const line = await getLine(`Do you want to include a template for a reducer? [Y|n] `);
            switch (line.toLowerCase()) {
                case "y":
                case "yes":
                case "":
                    includeReducer = true;
                    break;
                case "n":
                case "no":
                    includeReducer = false;
                    break;
                default:
                    console.log("Please answer yes or no.");
                    break;
            }
        }
        const path = dir + "/redux." + (format === Format.YAML ? "yml" : "json");
        if (await exists(path)) {
            let overwrite: boolean | null = null;
            while (overwrite === null) {
                const line = await getLine(`${path} already exists. Overwrite? [Y|n] `);
                switch (line.toLowerCase()) {
                    case "y":
                    case "yes":
                    case "":
                        overwrite = true;
                        break;
                    case "n":
                    case "no":
                        overwrite = false;
                        break;
                    default:
                        console.log("Please answer yes or no.");
                        break;
                }
            }
            if (!overwrite) {
                continue;
            }
        }
        await writeFile(path, getTemplate(includeReducer, format));
    }
}
