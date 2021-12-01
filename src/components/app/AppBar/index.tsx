import { Link } from "react-router-dom";
import { RouteId } from "../../../../res/ids";
import { useAuth, useNavigation } from "../../../contexts";
import { Box } from "../../layout";
import { NavigationGroup } from "../Routes/types";
import { Navigation, NavigationElement } from "./styled";
import { Text } from "../../common";

export function AppBar() {
    const auth = useAuth();
    const { getNavigationByGroup, getNavigationById } = useNavigation();

    const customNavi = getNavigationById([
        RouteId.HOME,
        RouteId.LOGOUT,
        !auth.isLoggedIn() ? RouteId.LOGIN : RouteId.NONE,
        RouteId.USERS,
        RouteId.COMPONENTS,
        RouteId.USERS_PROFILE,
        RouteId.USER_MGMT
    ]);

    // const navigation = getNavigationByGroup(NavigationGroup.HEAD);
    const elements = (customNavi as any[]).map((navItem) => {
        return (
            <NavigationElement key={navItem.id}>
                <Link to={navItem.path}>{navItem.label}</Link>
            </NavigationElement>
        );
    });
    return (
        <Box justifyContent="space-between">
            <Navigation>{elements}</Navigation>
            <Text fontWeight="700" color="white">
                {auth.getSession()?.username}
            </Text>
        </Box>
    );
}
