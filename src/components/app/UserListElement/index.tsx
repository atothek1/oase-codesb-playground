import { MapComponentProps } from "../../data";
import { UserItem } from "../../../types";
import { Box } from "../../layout";
import { Text } from "../../common";
import { Actions } from "../Actions";

interface UserListElementProps extends MapComponentProps<UserItem> {}

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
