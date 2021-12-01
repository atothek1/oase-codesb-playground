import { Text, Status } from "../../components";

interface ComponentsProps {}
export function Components(props: ComponentsProps) {
    return (
        <>
            <Text as="h1">Components</Text>
            <Status type="info" format="inline">
                Info Status Feedback
            </Status>
            <Status type="success" format="inline">
                Success Status Feedback
            </Status>
            <Status type="warning" format="inline">
                Warning Status Feedback
            </Status>
            <Status type="error" format="inline">
                Error Status Feedback
            </Status>
            <Status type="info">Info Status Feedback</Status>
            <Status type="success">Success Status Feedback</Status>
            <Status type="warning">Warning Status Feedback</Status>
            <Status type="error">Error Status Feedback</Status>
            <Status type="info" format="inline" disableIcon>
                Info Status Feedback
            </Status>
            <Status type="success" format="inline" disableIcon>
                Success Status Feedback
            </Status>
            <Status type="warning" format="inline" disableIcon>
                Warning Status Feedback
            </Status>
            <Status type="error" format="inline" disableIcon>
                Error Status Feedback
            </Status>
            <Status type="info" format="stretched" disableIcon>
                Info Status Feedback
            </Status>
            <Status type="success" format="stretched" disableIcon>
                Success Status Feedback
            </Status>
            <Status type="warning" format="stretched" disableIcon>
                Warning Status Feedback
            </Status>
            <Status type="error" format="stretched" disableIcon>
                Error Status Feedback
            </Status>
        </>
    );
}
