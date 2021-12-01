import { Text } from "../Text";
import { HeadingProps } from "./types";

export function Heading({ children, as = "h1", ...rest }: HeadingProps) {
    return (
        <Text forwardedAs={as} {...rest}>
            {children}
        </Text>
    );
}
