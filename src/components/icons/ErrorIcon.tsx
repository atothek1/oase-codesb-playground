import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "styled-components";
import { Theme } from "../../utils";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface ErrorIconProps {
    readonly type?: "light" | "solid" | "regular";
}
export function ErrorIcon(props: ErrorIconProps) {
    const { type = "solid" } = props;
    const prefix = type === "light" ? "fal" : type === "solid" ? "fas" : "far";
    const icon = faExclamationTriangle; //[prefix, "exclamation-triangle"];
    const { colors } = useTheme() as Theme;
    return <FontAwesomeIcon color={colors.colorError} icon={icon} />;
}
