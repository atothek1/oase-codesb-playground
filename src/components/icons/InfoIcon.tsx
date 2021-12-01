import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "styled-components";
import { Theme } from "../../utils";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface InfoIconProps {
    readonly type?: "light" | "solid" | "regular";
}
export function InfoIcon(props: InfoIconProps) {
    const { type = "solid" } = props;
    const prefix = type === "light" ? "fal" : type === "solid" ? "fas" : "far";
    const icon = faInfoCircle; //[prefix, "exclamation-triangle"];
    const { colors } = useTheme() as Theme;
    return <FontAwesomeIcon color={colors.colorInfo} icon={icon} />;
}
