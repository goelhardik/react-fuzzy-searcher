import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";
import SearchBox from "../src/SearchBox";
import MarkdownViewer from "./MarkdownViewer";

var sampleData = require("./data/sampleData.json");

const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        textAlign: "center",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        paddingBottom: "20px",
        height: "100%"
    },
    headerSection: {
        height: "400px",
        backgroundImage: "linear-gradient(to right, #5feca5, #a0eec7, #54b082)",
        position: "relative"
    },
    title: {
        margin: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    subtitle: {
        fontSize: "30px",
        marginTop: "20px",
        lineHeight: 1.3,
        width: "700px"
    },
    githubStarButton: {
        margin: "20px"
    },
    content: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridColumnGap: "30px",
        marginTop: "20px"
    },
    textField: {
        marginLeft: "30px",
        marginTop: "0"
    },
    searchBox: {
        width: "75%",
        justifySelf: "center",
        marginRight: "30px"
    },
    documentation: {
        width: "100%",
        display: "block",
    }
});

export interface ISearchBoxDemoProps extends WithStyles<typeof styles> {
}

interface ISearchBoxDemoState {
    searchableData: string;
}

class SearchBoxDemo extends React.Component<ISearchBoxDemoProps, ISearchBoxDemoState> {

    constructor(props: ISearchBoxDemoProps) {
        super(props);
        this.state = {
            searchableData: JSON.stringify(sampleData)
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.headerSection}>
                    <div className={classes.title}>
                        <Typography variant="h2">
                            React Fuzzy Searcher
                    </Typography>
                        <Typography variant="h2" className={classes.subtitle}>
                            A fuzzy search react component with match highlighting, using Fuse.js for the search.
                    </Typography>
                        <div className={classes.githubStarButton}>
                            <iframe src="https://ghbtns.com/github-btn.html?user=goelhardik&repo=react-fuzzy-searcher&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0" />
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    {false && (
                        <TextField
                            id="input-list"
                            label="Input list to search on"
                            multiline
                            value={this.state.searchableData}
                            onChange={this.handleSearchableDataChange}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            rows={10}
                        />
                    )}
                    <div className={classes.searchBox}>
                        {this.renderSearchBox()}
                    </div>
                </div>
                {true && <div className={classes.documentation}>
                    <MarkdownViewer />
                </div>}
            </div>
        );
    }

    private renderSearchBox = () => {
        const fuseOptions = {
            keys: getSearchKeys(),
            includeMatches: true,
            includeScore: true,
            threshold: 0.5
        };
        sampleData = sampleData.map((d: any, idx: number) => {
            d.onClick = () => console.log("Clicked");
            return d;
        });

        return (
            <SearchBox
                fuseOptions={fuseOptions}
                searchData={sampleData}
                placeholder="Search amongst the 50 most popular YouTube videos eg. 'football', 'ellen'.."
                searchResultOptions={{
                    showAvatar: true,
                    searchResultTitleKey: "snippet.title",
                    searchResultImageUrl: "snippet.thumbnails.default.url",
                    searchResultMatchKeys: {
                        "snippet.channelTitle": "Channel Title",
                        "snippet.tags": "Tags",
                        "snippet.description": "Description"
                    }
                }}
            />
        );
    }

    private handleSearchableDataChange = (event: any) => {
        this.setState({
            searchableData: event.target.value
        })
    }
}


export function getSearchKeys() {
    return [
        {
            name: "snippet.channelTitle",
            weight: 0.4
        },
        {
            name: "snippet.tags",
            weight: 0.2
        },
        {
            name: "snippet.description",
            weight: 0.5
        }
    ];
}

export default (withStyles(styles)(SearchBoxDemo));
