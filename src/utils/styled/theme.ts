import { Theme } from "./types";

const minUnit = 8;

export const theme: Theme = {
    colors: {
        backgroundColorInfo: "rgb(2, 134, 173, 0.5)",
        backgroundColorSuccess: "rgb(51, 150, 5, 0.5)",
        backgroundColorWarning: "rgb(218, 168, 32, 0.5)",
        backgroundColorError: "rgb(185, 34, 34, 0.5)",

        colorInfo: "rgb(2, 134, 173)",
        colorSuccess: "rgb(51, 150, 5)",
        colorWarning: "rgb(218, 168, 32)",
        colorError: "rgb(185, 34, 34)"
    },
    typo: {
        fontFamily: "Roboto",
        fontSize: "1.6rem"
    },
    spacing: {
        s1: `${minUnit / 10}rem`,
        s2: `${(minUnit / 10) * 2}rem`,
        s3: `${(minUnit / 10) * 3}rem`,
        s4: `${(minUnit / 10) * 4}rem`,
        s5: `${(minUnit / 10) * 5}rem`,
        s6: `${(minUnit / 10) * 6}rem`,
        s7: `${(minUnit / 10) * 7}rem`,
        s8: `${(minUnit / 10) * 8}rem`
    },
    size: {
        heightFixedHeader: `${(minUnit / 10) * 6}rem`,
        heightFixedFooter: `${(minUnit / 10) * 6}rem`,
        minHeightHeader: `${(minUnit / 10) * 7}rem`,
        minHeightFooter: `${(minUnit / 10) * 7}rem`,
        widthSidebarLeft: `${(minUnit / 10) * 30}rem`,
        widthSidebarRight: `${(minUnit / 10) * 30}rem`
    }
};
