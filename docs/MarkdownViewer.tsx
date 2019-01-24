import * as React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { markdowns } from "./documentation";
import * as ReactMarkdown from "react-markdown";

const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        textAlign: "center",
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
    }
});



class MarkdownViewer extends React.Component {

    public render() {
        // const bottom = <iframe src="https://ghbtns.com/github-btn.html?user=goelhardik&repo=react-fuzzy-searcher&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0" />;

        return <div>
            <ReactMarkdown
                source={markdowns.about} />
            <ReactMarkdown
                source={markdowns.gettingStarted} />
            <ReactMarkdown
                source={markdowns.install} />
        </div>
    }
}

export default (withStyles(styles)(MarkdownViewer));
