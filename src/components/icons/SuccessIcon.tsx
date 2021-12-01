import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "styled-components";
import { Theme } from "../../utils";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface SuccessIconProps {
    readonly type?: "light" | "solid" | "regular";
}
export function SuccessIcon(props: SuccessIconProps) {
    const { type = "solid" } = props;
    const prefix = type === "light" ? "fal" : type === "solid" ? "fas" : "far";
    const icon = faCheckCircle; //[prefix, "exclamation-triangle"];
    const { colors } = useTheme() as Theme;
    return <FontAwesomeIcon color={colors.colorSuccess} icon={icon} />;
}
