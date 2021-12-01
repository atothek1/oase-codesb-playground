import { Dispatch } from "react";

export interface FSAWithType<TType> {
    readonly type: TType;
}

export interface FSAWithTypePayload<TType, TPayload> extends FSAWithType<TType> {
    readonly payload: TPayload;
}

export interface FSAWithTypePayloadMeta<TType, TPayload, TMeta>
    extends FSAWithTypePayload<TType, TPayload> {
    readonly meta: TMeta;
    readonly error: boolean;
}

export type FSA<
    TType = string,
    TPayload = undefined,
    TMeta = undefined
> = TPayload extends undefined
    ? FSAWithType<TType>
    : TMeta extends undefined
    ? FSAWithTypePayload<TType, TPayload>
    : FSAWithTypePayloadMeta<TType, TPayload, TMeta>;

export type ActionCreatorFnWithType<TType> = () => FSA<TType>;
export type ActionCreatorFnWithPayload<TType, TPayload> = (
    payload: TPayload
) => FSA<TType, TPayload>;
export type ActionCreatorFnWithPayloadAndMeta<TType, TPayload, TMeta> = (
    payload: TPayload,
    meta: TMeta,
    error?: boolean
) => FSA<TType, TPayload, TMeta>;

export type ActionCreatorFn<TType, TPayload = undefined, TMeta = undefined> =
    | TPayload
    | [TPayload] extends undefined | [undefined]
    ? ActionCreatorFnWithType<TType>
    : TMeta | [TMeta] extends undefined | [undefined]
    ? ActionCreatorFnWithPayload<TType, TPayload>
    : ActionCreatorFnWithPayloadAndMeta<TType, TPayload, TMeta>;

export type ExtractType<T> = T extends FSA<infer TType> ? TType : undefined;
export type ExtractPayload<T> = T extends FSA<unknown, infer TPayload> ? TPayload : undefined;
export type ExtractMeta<T> = T extends FSA<unknown, unknown, infer TMeta> ? TMeta : undefined;

export type ActionReducerMap<TState> = Record<keyof TState, Reducer<TState>>;

export interface ActionReducerPair<TType, TState, TAction extends FSA<unknown>> {
    readonly type: TType;
    readonly reducer: Reducer<TState, TAction>;
}

export type Reducer<TState = unknown, TAction extends FSA<unknown> = FSA<unknown>> = (
    state: TState,
    action: TAction
) => TState;

export type Selector<TState = unknown, TReturn = unknown> = (
    state: TState,
    ...params: unknown[]
) => TReturn;

export interface MiddlewareAPI<
    D extends Dispatch<FSA<unknown>> = Dispatch<FSA<unknown>>,
    TState = unknown
> {
    dispatch: D;
    getState(): TState;
}

export interface Middleware<
    TState = any,
    TDispatch extends Dispatch<FSA<unknown>> = Dispatch<FSA<unknown>>
> {
    (api: MiddlewareAPI<TDispatch, TState>): (
        next: TDispatch
    ) => (action: TDispatch extends Dispatch<infer A> ? A : never) => any;
}

export type MiddlewareExecuteFn<TState, TAction extends FSA<ExtractType<TAction>>> = (
    action: Readonly<TAction>,
    next: Dispatch<TAction>,
    api: MiddlewareAPI<Dispatch<FSA<unknown>>, TState>,
    types?: string[]
) => TAction | never;

export type StoreApi<TState> = MiddlewareAPI<Dispatch<FSA<unknown>>, TState>;

export interface StoreConfig<TState, TAction extends ActionCreatorFn<ExtractType<TAction>>> {
    readonly name: string;
    readonly reducer: Reducer<TState, FSA<ExtractType<TAction>>>;
    readonly actions: Record<string, ActionCreatorFn<string>>;
    readonly selectors: Record<string, Selector<TState>>;
}
