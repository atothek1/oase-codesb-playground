import { useCallback, useMemo, useState } from "react";
import { isFunction } from "../utils";

const key = "myLocaleStorage";
if (window.localStorage.getItem(key) === null) {
    window.localStorage.setItem(key, JSON.stringify({ __initialized: true }));
}

export function useLocalStorage(innerKey: string) {
    const storage = JSON.parse(window.localStorage.getItem(key)!);
    const [currentValue, updateCurrentValue] = useState(storage);
    const value = useMemo(() => {
        return storage[innerKey];
    }, [innerKey, storage]);

    const setValue = useCallback(
        (v) => {
            const valueToStore = isFunction(v) ? v(currentValue) : v;
            if (JSON.stringify(storage[innerKey]) === JSON.stringify(valueToStore)) {
                return;
            }
            storage[innerKey] = valueToStore;
            window.localStorage.setItem(key, JSON.stringify(storage));
            updateCurrentValue(storage);
        },
        [storage, innerKey, currentValue, updateCurrentValue]
    );

    return [value, setValue];
}
