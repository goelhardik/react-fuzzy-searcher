import * as React from "react";
import { InputBase, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import * as Fuse from "fuse.js";
import SearchDropdown from "./SearchDropdown";
import { ISearchResultOptions } from "./SearchResult";
var colors = require("./Common.scss");

const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${colors.placeholderGray}`,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "auto"
        },
        display: "grid",
        gridTemplateColumns: "50px auto max-content",
        alignItems: "center"
    },
    searchIcon: {
        pointerEvents: "none",
        color: "#828785"
    },
    inputRoot: {
        color: "inherit",
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif"
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2,
        transition: theme.transitions.create("width"),
        width: "100%",
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
        fontSize: "1.1rem",
        // fontFamily: '"Roboto", "Helvetica", "Arial", sans - serif',
        fontWeight: 350
    },
    searchResultCount: {
        marginRight: "10px",
        fontStyle: "italic",
        color: colors.placeholderGray,
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif"
    }
});

export interface ISearchBoxProps<T> extends WithStyles<typeof styles> {
    fuseOptions: Fuse.FuseOptions<T>;
    searchData: any;
    maxDropdownHeight?: string;
    placeholder?: string;
    searchResultOptions?: ISearchResultOptions;
    hideSearchResultCount?: boolean;
}

interface ISearchBoxState {
    showDropdown: boolean;
    searchResults: any;
}

class SearchBox extends React.Component<ISearchBoxProps<any>, ISearchBoxState> {

    private anchorEl: HTMLDivElement | null;

    constructor(props: ISearchBoxProps<any>) {
        super(props);
        this.state = {
            showDropdown: false,
            searchResults: []
        };
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} ref={node => this.anchorEl = node}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder={this.props.placeholder || ""}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        onChange={this.search}
                        onKeyDown={this.search}
                        onMouseDown={this.search}
                    />
                    {!this.props.hideSearchResultCount && <Typography component="p" className={classes.searchResultCount}>
                        {`${this.state.searchResults.length} results`}
                    </Typography>}
                </div>
                {this.renderDropdown()}
            </div>
        );
    }

    private search = (event: any) => {
        // close dropdown if esc key pressed
        if (event.keyCode === 27) {
            this.setState({
                showDropdown: false
            });
            return;
        }
        const searchKey = event.target.value;

        this.performFuseSearch(searchKey);

        let showDropdown = false;
        if (searchKey.length > 0) {
            showDropdown = true;
        }
        this.setState({
            showDropdown: showDropdown
        });
    }

    private performFuseSearch = (searchKey: string) => {
        const options = this.props.fuseOptions;
        options.includeMatches = true;
        options.includeScore = true;
        const fuse = new Fuse(this.props.searchData, options);

        let result = [];
        if (searchKey.length > 0) {
            result = fuse.search(searchKey);
        }

        this.setState({
            searchResults: result
        });
    }

    private renderDropdown = () => {
        return (
            <SearchDropdown
                anchorEl={this.anchorEl}
                data={this.state.searchResults}
                showDropdown={this.state.showDropdown}
                handleDropdownClose={this.handleDropdownClose}
                maxDropdownHeight={this.props.maxDropdownHeight || "500px"}
                searchResultOptions={this.props.searchResultOptions}
            />
        );
    }

    private handleDropdownClose = (event: any) => {
        if (this.anchorEl && this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ showDropdown: false });
    }
}

export default (withStyles(styles)(SearchBox));