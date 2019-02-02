import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import { Typography, TextField, Divider, FormControlLabel, Checkbox } from "@material-ui/core";
import SearchBox from "../src/SearchBox";
import MarkdownGrid from "./MarkdownGrid";
// var colors = require("./Common.scss");

var otherSampleData = require("./data/otherSampleData.json");
otherSampleData = JSON.stringify(otherSampleData, undefined, 4);

const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        textAlign: "center",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        paddingBottom: "20px"
    },
    subtitle: {
        fontSize: "30px",
        marginTop: "20px",
        lineHeight: 1.3,
        maxWidth: "75%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    content: {
        width: "95%",
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridColumnGap: "20px",
        marginTop: "20px"
    },
    textField: {
        marginLeft: "20px",
        marginRight: "20px",
        width: "-webkit-fill-available"
    },
    searchBoxDemo: {
        justifySelf: "center",
        border: "1px solid grey",
        height: "min-content",
        marginRight: "20px",
        marginLeft: "20px"
    },
    stepTitle: {
        fontSize: "25px",
        marginTop: "20px",
        lineHeight: 1.3,
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: "10px"
    },
    divider: {
        marginBottom: "10px"
    },
    settingsPane: {
        textAlign: "left",
        marginLeft: "20px"
    },
    settingTitle: {
        fontSize: "18px",
        lineHeight: 1.3
    },
    showAvatarSetting: {

    },
    searchKeysSetting: {
        width: "-webkit-fill-available"
    },
    settingSubtitle: {
        marginTop: "-15px"
    },
});

export interface ICustomInputDemoProps extends WithStyles<typeof styles> {
}

interface ICustomInputDemoState {
    searchableData: string;
    showAvatar: boolean;
    searchKeys: string;
}

class CustomInputDemo extends React.Component<ICustomInputDemoProps, ICustomInputDemoState> {

    constructor(props: ICustomInputDemoProps) {
        super(props);
        this.state = {
            searchableData: otherSampleData,
            showAvatar: false,
            searchKeys: getOtherDataSearchKeys()
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h2" className={classes.subtitle}>
                    ...or try your own input data
                </Typography>
                <div className={classes.content}>
                    <div>
                        <Typography variant="h2" className={classes.stepTitle}>
                            Step 1: Enter your input
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                        <TextField
                            id="input-list"
                            label="Enter your own input list to search on (must be a valid json array)"
                            multiline
                            value={this.state.searchableData}
                            onChange={this.handleSearchableDataChange}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            rows={10}
                        />
                    </div>
                    <div>
                        <Typography variant="h2" className={classes.stepTitle}>
                            Step 2: Configure settings
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                        {this.renderSettings()}
                    </div>
                    <div>
                        <Typography variant="h2" className={classes.stepTitle}>
                            Step 3: Search
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                        <div className={classes.searchBoxDemo}>
                            {this.renderSearchBox()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderSettings = () => {
        const { classes } = this.props;

        return <div className={classes.settingsPane}>
            {this.renderAvatarCheckbox()}
            <Divider variant="middle" className={classes.divider} />
            {this.renderSearchKeysTextbox()}
        </div>
    }

    private renderSearchKeysTextbox = () => {
        const { classes } = this.props;

        return <div>
            <Typography variant="h3" className={classes.settingTitle}>
                Search Keys
            </Typography>
            <TextField
                id="search-key-list"
                label="Enter search keys for Fuse.js"
                multiline
                value={this.state.searchKeys}
                onChange={this.handleSearchKeysChange}
                className={classes.searchKeysSetting}
                margin="normal"
                variant="outlined"
            />
            <div className={classes.settingSubtitle}>
                <MarkdownGrid
                    sections={[
                        {
                            content: "Fuse.js setting. List of properties that will be searched. This supports nested properties, weighted search, searching in arrays of strings and objects."
                        }
                    ]}
                />
            </div>
        </div>;
    }

    private renderAvatarCheckbox = () => {
        const { classes } = this.props;

        return <div>
            <Typography variant="h3" className={classes.settingTitle}>
                Search result avatar
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.state.showAvatar}
                        onChange={this.toggleAvatar}
                        value="showAvatar"
                        color="primary"
                    />
                }
                label="Show avatar"
                className={classes.showAvatarSetting}
            />
            <div className={classes.settingSubtitle}>
                <MarkdownGrid
                    sections={[
                        {
                            content: "Select to toggle avatar showing in the dropdown results. To show avatar, each object in the input list must have either an `imageUrl` property, OR pass in a custom property name in the `searchResultOptions` settings below. This url must be an image's url."
                        }
                    ]}
                />
            </div>
        </div>;
    }

    private renderSearchBox = () => {
        const fuseOptions = {
            keys: JSON.parse(this.state.searchKeys),
            includeMatches: true,
            includeScore: true,
            threshold: 0.5
        };
        var userInputData;
        try {
            userInputData = JSON.parse(this.state.searchableData).map((d: any, idx: number) => {
                d.onClick = () => console.log("Clicked");
                return d;
            });
        } finally {
            return (
                <SearchBox
                    fuseOptions={fuseOptions}
                    searchData={userInputData}
                    placeholder="Search on your own input on the left..."
                    searchResultOptions={{
                        showAvatar: this.state.showAvatar,
                        searchResultTitleKey: "title",
                        // searchResultImageUrl: "snippet.thumbnails.default.url",
                        searchResultMatchKeys: {
                            "title": "Title",
                            "author.lastName": "Author Last Name"
                        }
                    }}
                />
            );
        }
    }

    private toggleAvatar = (event: any) => {
        this.setState({
            showAvatar: !this.state.showAvatar
        });
    }

    private handleSearchableDataChange = (event: any) => {
        this.setState({
            searchableData: event.target.value
        })
    }

    private handleSearchKeysChange = (event: any) => {
        this.setState({
            searchKeys: event.target.value
        })
    }
}

export function getOtherDataSearchKeys() {
    return '["title", "author.lastName"]';
}

export default (withStyles(styles)(CustomInputDemo));
