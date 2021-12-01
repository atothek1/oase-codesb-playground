import { MutableRefObject, useEffect, useMemo, useRef } from "react";

export function useCreateRef<TObj = unknown>(
    factory: (ref?: TObj) => TObj,
    deps: unknown[] = []
): TObj {
    const ref = useRef<TObj>();

    function create() {
        if (ref.current === undefined) {
            ref.current = factory(ref.current);
        }
        return ref.current;
    }
    const current = useMemo(create, [factory, ...deps]);

    return current;
}
