import React from "react";
import { useLocation, useParams } from "react-router";
import { useTheme } from "styled-components";
import { Box, Text } from "../../components";
import { useAuth } from "../../contexts";

type PathParams = { username: string };
export function User() {
    const { username } = useParams<PathParams>();
    const { isMe } = useAuth();
    console.log("isme: ", isMe(username));
    const { spacing } = useTheme();
    return (
        <>
            <Box>
                <Text as="p">Default Box as Row</Text>
            </Box>
            <Box padding={spacing.s1}>
                <Text as="p">Default Box as Row with padding</Text>
            </Box>
            <Box>
                <Text as="p">Default Box as Row with margin</Text>
            </Box>
            <Box column>
                <Text>Default Box as </Text>
                <Text>Column</Text>
                <a href="#">Link</a>
            </Box>
            <Box column alignItems="center">
                <Text>Default Box as </Text>
                <Text>Column</Text>
                <Text>items and centered</Text>
            </Box>
            <Box height="200px" column justifyContent="center">
                <Box column height="fit-content">
                    <Text>Default Box as </Text>
                    <Text>Column</Text>
                    <Text>content and centered</Text>
                </Box>
            </Box>
        </>
    );
}
