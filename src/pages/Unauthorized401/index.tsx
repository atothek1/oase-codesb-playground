import { Link } from "react-router-dom";
import { HttpStatus } from "../../components";

export function Unauthorized401() {
    return (
        <HttpStatus code="401">
            You are not logged in. <br />
            Please <Link to="/login">login</Link> to continue.
        </HttpStatus>
    );
}
