import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import * as ReactMarkdown from "react-markdown";

const styles = (theme: Theme) => createStyles({
    root: {
        width: "max-content",
        margin: "auto",
        textAlign: "left",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        display: "grid",
        gridTemplateColumns: "1fr 7fr",
        gridColumnGap: "20px"
    },
    sidebar: {
        height: "min-content",
        justifySelf: "start",
        display: "grid",
        gridTemplateRows: "min-content"
    },
    contentContainer: {
        overflowY: "scroll",
        maxHeight: "--webkit-fill-available"
    },
    content: {
        marginTop: "50px"
    },
    button: {
        margin: "auto",
        justifyContent: "start",
        width: "100%"
    },
});

export interface IMarkdownGridSection {
    title: string;
    content: string;
}

export interface IMarkdownGridProps extends WithStyles<typeof styles> {
    sections: IMarkdownGridSection[];
}

class MarkdownGrid extends React.Component<IMarkdownGridProps, {}> {

    public render() {
        const { classes } = this.props;
        // const bottom = <iframe src="https://ghbtns.com/github-btn.html?user=goelhardik&repo=react-fuzzy-searcher&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0" />;

        return (
            <Paper elevation={2}>
                <div className={classes.root}>
                    {this.renderSidebar()}
                    {this.renderContent()}
                </div>
            </Paper>
        );
    }

    private renderSidebar = () => {
        const { classes, sections } = this.props;

        return <div className={classes.sidebar}>
            {sections.map((s: IMarkdownGridSection, idx: number) => {
                return <Button href={`#${s.title}`} className={classes.button}>
                    {`${idx + 1}. ${s.title}`}
                </Button>;
            })}
        </div>
    }

    private renderContent = () => {
        const { classes, sections } = this.props;

        return <div className={classes.contentContainer}>
            {sections.map((s: IMarkdownGridSection, idx: number) => {
                return <ReactMarkdown
                    source={s.content}
                    className={classes.content}
                    // renderers={{
                    //     "heading": ()
                    // }}
                />;
            })}
        </div>
    }

}

export default (withStyles(styles)(MarkdownGrid));
