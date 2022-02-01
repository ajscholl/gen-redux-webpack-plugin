import * as fs from "fs";

export function readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => fs.readFile(path, { encoding: "utf-8" }, (err, data) => (err ? reject(err) : resolve(data))));
}

export function writeFile(path: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => fs.writeFile(path, data, (err) => (err ? reject(err) : resolve())));
}

export function readdir(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => fs.readdir(path, (err, paths) => (err ? reject(err) : resolve(paths))));
}

export function stat(path: string): Promise<fs.Stats> {
    return new Promise((resolve, reject) => fs.stat(path, (err, stats) => (err ? reject(err) : resolve(stats))));
}

export function exists(path: string): Promise<boolean> {
    return new Promise((resolve) => fs.exists(path, resolve));
}

export function unlink(path: string): Promise<void> {
    return new Promise((resolve, reject) => fs.unlink(path, (err) => (err ? reject(err) : resolve())));
}

export function mapError<T>(f: () => T, mapper: (message: string) => string): T {
    try {
        return f();
    } catch (error) {
        if (error instanceof Error) {
            error.message = mapper(error.message);
        }
        throw error;
    }
}

export async function mapErrorAsync<T>(f: () => Promise<T>, mapper: (message: string) => string): Promise<T> {
    try {
        return await f();
    } catch (error) {
        if (error instanceof Error) {
            error.message = mapper(error.message);
        }
        throw error;
    }
}
