import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import { Typography, TextField } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        textAlign: "center",
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
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
        gridTemplateColumns: "1fr 2fr",
        gridColumnGap: "30px"
    },
    textField: {
        marginLeft: "30px"
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
            searchableData: ""
        }
    }

    render() {
        const { classes } = this.props;

        return <div className={classes.root}>
            <div className={classes.headerSection}>
                <div className={classes.title}>
                    <Typography variant="h2">
                        React Fuzzy Searcher
                    </Typography>
                    <Typography variant="h2" className={classes.subtitle}>
                        A fuzzy search react component with match highlighting, using Fuse.js for the search.
                    </Typography>
                    <div className={classes.githubStarButton}>
                        <iframe src="https://ghbtns.com/github-btn.html?user=goelhardik&repo=react-fuzzy-searcher&type=star&count=true&size=large" scrolling="0" width="160px" height="30px" frameBorder="0"></iframe>
                    </div>
                </div>
            </div>

            <div className={classes.content}>
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
            </div>
        </div>;
    }

    handleSearchableDataChange = (event: any) => {
        var value = event.target.value;
        var obj = JSON.parse(value);
        var pretty = JSON.stringify(obj, undefined, 4);

        this.setState({
            searchableData: pretty
        })
    }
}

export default (withStyles(styles)(SearchBoxDemo));