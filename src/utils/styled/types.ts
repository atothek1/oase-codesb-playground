export type JustifyContent =
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";

export type AlignItems = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";

export enum FlexDirection {
    ROW = "row",
    COL = "column"
}

export type ColorKeys = keyof Colors;
export interface Colors {
    readonly [key: ColorKeys]: string;

    readonly backgroundColorInfo: string;
    readonly backgroundColorSuccess: string;
    readonly backgroundColorWarning: string;
    readonly backgroundColorError: string;

    readonly colorInfo: string;
    readonly colorSuccess: string;
    readonly colorWarning: string;
    readonly colorError: string;
}

export interface Typo {
    readonly fontFamily: string;
    readonly fontSize: string;
}

export interface Spacing {
    readonly s1: string; // 8px
    readonly s2: string; // 16px
    readonly s3: string; // 24px
    readonly s4: string; // 32px
    readonly s5: string; // 40px
    readonly s6: string; // 48px
    readonly s7: string; // 56px
    readonly s8: string; // 64px

    //readonly s1_5: string; // 12px
}

export interface Size {
    readonly heightFixedHeader: string;
    readonly heightFixedFooter: string;
    readonly minHeightHeader: string;
    readonly minHeightFooter: string;
    readonly widthSidebarLeft: string;
    readonly widthSidebarRight: string;
}

export interface Theme {
    readonly colors: Colors;
    readonly typo: Typo;
    readonly spacing: Spacing;
    readonly size: Size;
}
