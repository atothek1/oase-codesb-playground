import { BlankLayout, BlankWithHeaderLayout, MainLayout } from "../src/components";
import { LayoutRegistry, LayoutType } from "../src/contexts";

export function getLayouts(): LayoutRegistry {
    return {
        [LayoutType.MAIN]: { type: LayoutType.MAIN, component: MainLayout },
        [LayoutType.BLANK_WITH_HEADER]: {
            type: LayoutType.BLANK_WITH_HEADER,
            component: BlankWithHeaderLayout
        },
        [LayoutType.BLANK]: { type: LayoutType.BLANK, component: BlankLayout }
    };
}
