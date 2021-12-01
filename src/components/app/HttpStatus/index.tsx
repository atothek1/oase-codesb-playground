import { Box, Heading } from "../../";
import { HttpStatusProps } from "./types";

export function HttpStatus({ code, children }: HttpStatusProps) {
    return (
        <Box column justifyContent="center" alignItems="center">
            <Heading as="h1">{code}!</Heading>
            <Heading as="h2">{children}</Heading>;
        </Box>
    );
}
