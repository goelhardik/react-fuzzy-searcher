import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import "./MarkdownGrid.css";
import "./solarized-light.css";
import MarkdownSection from "./MarkdownSection";

// var colors = require("./Common.scss");
var hljs = require('highlight.js');
var Remarkable = require('remarkable');
var md = new Remarkable('full', {
    html: false,        // Enable HTML tags in source
    xhtmlOut: false,        // Use '/' to close single tags (<br />)
    breaks: false,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks
    linkify: true,         // autoconvert URL-like texts to links
    linkTarget: '',           // set target to open link in

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    highlight: function (str: any, lang: any) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                console.log("LANG HIGHLIGHT", lang);
                return hljs.highlight(lang, str).value;
            } catch (__) { }
        }

        try {
            console.log("AUTO HIGHLIGHT");
            return hljs.highlightAuto(str).value;
        } catch (__) { }

        console.log("DEFAULT HIGHLIGHT");
        return ''; // use external default escaping
    }
});

const styles = (theme: Theme) => createStyles({
    root: {
        margin: "auto",
        textAlign: "left",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        padding: "20px"
    },
    paperContainer: {
        // backgroundColor: colors.backgroundGray
        marginBottom: "20px"
    },
    sidebar: {
        height: "min-content",
        justifySelf: "start",
        display: "grid",
        gridTemplateRows: "min-content",
    },
    contentContainer: {
        overflowY: "scroll",
        maxHeight: "--webkit-fill-available"
    },
    content: {
        marginTop: "50px",
    },
    button: {
        margin: "auto",
        justifyContent: "start",
        width: "100%",
        fontSize: "1.0rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans - serif',
        fontWeight: 350,
        textTransform: "capitalize",
        padding: "10px"
    }
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
            <Paper elevation={4} className={classes.paperContainer}>
                <div className={classes.root}>
                    {false && this.renderSidebar()}
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
                var html = md.render(s.content);
                console.log("HTML", typeof html);
                return <MarkdownSection
                    section={{
                        title: s.title,
                        content: md.render(s.content)
                    }}
                />;
            })}
        </div>
    }
}

export default (withStyles(styles)(MarkdownGrid));
