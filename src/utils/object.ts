type FindPredicate<T> = (item: any, key: string, target: T) => any;
type MapCallback<T, K extends keyof T> = (item: T[K], key: K, source: T) => any;

export function find<R, T extends Record<string, any>>(
    target: T,
    predicate: FindPredicate<T>
): R | undefined {
    const key = Object.keys(target).find((key) => predicate(target[key] as R, key, target));
    return key ? (target[key] as R) : undefined;
}

export function map<T extends Record<string, any>>(
    source: T,
    callback: MapCallback<T, keyof T>
): any {
    return Object.keys(source).map((key) => callback(source[key], key, source));
}

export function hasOwn<T>(target: T, propName: string): boolean {
    return Object.prototype.hasOwnProperty.call(target, propName);
}
