import { MapComponentProps } from "../../../src/components/data";
import { User } from "../services/types";
import { Box } from "../../../src/components/layout";
import { Text } from "../../../src/components/common";
import { Actions } from "./Actions";

interface UserListElementProps extends MapComponentProps<User> {}

export function UserListElement(props: UserListElementProps) {
    const { data, index } = props;
    const bgColor = index % 2 == 0 ? "lightgray" : "white";
    return (
        <Box width="100%" backgroundColor={bgColor} justifyContent="space-between">
            <Text as="p" noWrap>
                {index}
            </Text>
            <Text as="p" noWrap>
                {data.username}
            </Text>
            <Text as="p" noWrap>
                {data.phone}
            </Text>
            <Actions />
        </Box>
    );
}
