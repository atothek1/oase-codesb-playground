import "./src/utils/styled/styled.d";

declare interface KeyValuePair<T = unknown> {
    readonly key: string;
    readonly value: T;
}

declare interface Dictionary<T = unknown> {
    [key: string]: T;
}

declare interface ReadonlyDictionary<T = unknown> {
    readonly [key: string]: Readonly<T>;
}
