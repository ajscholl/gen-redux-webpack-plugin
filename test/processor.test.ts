import { Processor } from "../src";
import { cwd } from "process";
import { readFile } from "../src/utils";
import { relative } from "path";

const tests = ["simple", "withImport", "complex"];

async function runTest(test: string): Promise<void> {
    const path = relative(cwd(), `${__dirname}/${test}`);
    const processor = new Processor();
    processor.setLibPath("../utils", "test/utils.ts");
    await processor.processFiles([`${path}`]);
    const generated = await readFile(`${path}/actions.ts`);
    const expected = await readFile(`${path}/actions.expected.ts`);
    expect(generated).toEqual(expected);
}

for (const test of tests) {
    it(`works with test ${test}`, async () => {
        await runTest(test);
    });
}
