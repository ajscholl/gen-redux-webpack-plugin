// DO NOT EDIT - AUTOMATICALLY GENERATED!
// This file is generated by gen-redux-webpack-plugin.

export interface Action<T> {
    type: T;
}

export type Dispatch<T = unknown> = (action: Action<T>) => void;

const objPrototype = Object.getPrototypeOf({});

export function deepFreeze<S>(obj: S): S {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (Array.isArray(obj) && !Object.isFrozen(obj)) {
        for (let i = 0; i < obj.length; i++) {
            obj[i] = deepFreeze(obj[i]);
        }
    } else if (Object.isFrozen(obj) || Object.getPrototypeOf(obj) !== objPrototype) {
        return obj;
    } else {
        for (const k in obj) {
            obj[k] = deepFreeze(obj[k]);
        }
    }

    return Object.freeze(obj);
}
