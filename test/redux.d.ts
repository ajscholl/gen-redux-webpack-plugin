declare module "redux" {
    export interface Action<T> {
        type: T;
    }
}
