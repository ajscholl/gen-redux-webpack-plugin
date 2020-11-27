import { exists, readFile } from "../src/utils";
import { Processor } from "../src";
import { cwd } from "process";
import { relative } from "path";

const tests = ["simple", "withImport", "complex", "yaml", "reducer", "todoApp"];

async function runTest(test: string): Promise<void> {
    const path = relative(cwd(), `${__dirname}/${test}`);
    const processor = new Processor();
    processor.setLibPath("../utils", "test/utils.ts");
    await processor.processFiles([`${path}`]);
    const generated = await readFile(`${path}/actions.ts`);
    const expected = await readFile(`${path}/actions.expected.ts`);
    expect(generated).toEqual(expected);
    if (await exists(`${path}/reducer.expected.ts`)) {
        const generatedReducer = await readFile(`${path}/reducer.ts`);
        const expectedReducer = await readFile(`${path}/reducer.expected.ts`);
        expect(generatedReducer).toEqual(expectedReducer);
    }
}

for (const test of tests) {
    it(`works with test ${test}`, async () => {
        await runTest(test);
    });
}
