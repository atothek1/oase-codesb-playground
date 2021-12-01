import { Link } from "react-router-dom";
import { Heading } from "../../components";

export function Home() {
    return (
        <>
            <Heading>Home Page</Heading>
            <Link to="/users/atothek/profile">Protected Profile</Link>
        </>
    );
}
