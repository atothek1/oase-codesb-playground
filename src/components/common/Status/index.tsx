import React from "react";
import { StatusComponentProps } from "../../../contexts/ServiceContext/types";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../icons";
import { Box } from "../../layout";
import { StyledStatus, StatusText } from "./styled";
import { StatusType } from "./types";

function getStatusIcon(type: StatusType) {
    switch (type) {
        case "error":
            return <ErrorIcon />;
        case "info":
            return <InfoIcon />;
        case "warning":
            return <WarningIcon />;
        case "success":
            return <SuccessIcon />;
    }
}

interface StatusProps extends StatusComponentProps {
    readonly format?: "box" | "inline" | "stretched";
    readonly disableIcon?: boolean;
}
export function Status(props: StatusProps) {
    const { children, type, format = "box", disableIcon = false } = props;
    const iconElement = disableIcon ? null : getStatusIcon(type);
    const textElement = (
        <Box alignItems="flex-start" gap="8px">
            {iconElement}
            <StatusText type={type}>{children}</StatusText>
        </Box>
    );

    if (format === "inline") {
        return textElement;
    }
    const width = format === "stretched" ? "100%" : "fit-content";
    return (
        <StyledStatus type={type} $width={width} justifyContent="center" alignItems="center">
            {textElement}
        </StyledStatus>
    );
}
