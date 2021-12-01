import { StrictMode } from "react";
import { render } from "react-dom";
import { getLayouts } from "../res/layouts";
import { getRoutes } from "../res/routes";
import { App } from "./components";
import { getRootElement } from "./utils";

render(
    <StrictMode>
        <App routes={getRoutes()} layouts={getLayouts()} />
    </StrictMode>,
    getRootElement()
);
