import React from "react";
import { Box, Text } from "../../";
import { LoaderIcon } from "../../icons";

export function Loader() {
    return (
        <Box column>
            <LoaderIcon />
            <Text as="p">Loading</Text>
        </Box>
    );
}
