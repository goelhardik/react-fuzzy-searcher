import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { markdowns } from "./documentation";

const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%"
    }
});

class MarkdownViewer extends React.Component {

    public render() {
        return <ReactMarkdown source={markdowns.about} />;
    }
}

export default (withStyles(styles)(MarkdownViewer));
