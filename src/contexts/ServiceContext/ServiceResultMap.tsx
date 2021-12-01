import React from "react";
import { Map, MapComponentProps } from "../../components";
import { ServiceConsumerComponentProps } from "./types";

interface ServiceResultMapProps<TData = any> extends ServiceConsumerComponentProps<TData> {
    readonly component: React.ComponentType<MapComponentProps<TData>>;
}
export function ServiceResultMap(props: ServiceResultMapProps) {
    const {
        result: { data },
        component
    } = props;

    return <Map data={data} component={component} />;
}
