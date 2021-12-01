import { Link } from "react-router-dom";
import { HttpStatus } from "../../components";

export function Forbidden403() {
    return (
        <HttpStatus code="403">
            You are not allowed to see this page. Please contact your supervisor to grant you
            access.
            <br /> Go <Link to="/">Home</Link>
        </HttpStatus>
    );
}
