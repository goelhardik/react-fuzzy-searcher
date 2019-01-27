import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import { markdowns } from "./documentation";
import MarkdownGrid from "./MarkdownGrid";

const styles = (theme: Theme) => createStyles({
    root: {
        width: "max-content",
        textAlign: "center",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        margin: "auto",
        marginTop: "20px"
    }
});


export interface IMarkdownViewerProps extends WithStyles<typeof styles> {
}


class MarkdownViewer extends React.Component<IMarkdownViewerProps, {}> {

    public render() {
        const { classes } = this.props;
        // const bottom = <iframe src="https://ghbtns.com/github-btn.html?user=goelhardik&repo=react-fuzzy-searcher&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0" />;

        return <div className={classes.root}>
            <MarkdownGrid
                sections={[
                    {
                        title: "about",
                        content: markdowns.about
                    },
                    {
                        title: "getting started",
                        content: markdowns.gettingStarted
                    },
                    {
                        title: "Install",
                        content: markdowns.install
                    }
                ]}
            />
        </div>
    }
}

export default (withStyles(styles)(MarkdownViewer));
