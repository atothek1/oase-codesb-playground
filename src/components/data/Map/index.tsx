import React from "react";

export interface MapItem {
    readonly id: string;
}

export interface MapComponentProps<TData = any> {
    readonly index: number;
    readonly data: TData;
}

interface MapProps<TData extends MapItem> {
    readonly data: TData[] | null;
    readonly component: React.ComponentType<MapComponentProps<TData>>;
}

export function Map<TData extends MapItem = any>({ data, component }: MapProps<TData>) {
    if (data === null) {
        return null;
    }
    const elements = data.map((item, index) => {
        return React.createElement(component, { key: item.id, data: item, index });
    });
    return <>{elements}</>;
}
