#!/usr/bin/env node
import Processor from "../processor";

const args = process.argv.slice(1);

new Processor().processFiles(args);
