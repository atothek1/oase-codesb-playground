export type Store = ReadonlyDictionary<any>;

export interface Action<TPayload> {
    readonly type: string;
    readonly payload: TPayload;
}

export type ActionCreator<TPayload> = (payload?: TPayload) => Action<TPayload>;
export type Selector = (state: Store, ...args: any) => any;

export interface ContextValue {
    readonly actions: ReadonlyDictionary<ActionCreator<any>>;
    readonly selectors: ReadonlyDictionary<Selector>;
    getState(): Store;
}
