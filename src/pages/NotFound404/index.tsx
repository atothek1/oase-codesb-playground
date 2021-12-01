import { Link } from "react-router-dom";
import { HttpStatus } from "../../components";

export function NotFound404() {
    return (
        <HttpStatus code="404">
            We apologize we cannot find the requested resource. <br />
            Back to <Link to="/">Home</Link>
        </HttpStatus>
    );
}
