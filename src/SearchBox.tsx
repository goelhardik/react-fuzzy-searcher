import * as React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { FuseOptions } from "fuse.js";
import * as Fuse from "fuse.js";
import SearchDropdown from './SearchDropdown';
import { ISearchResultOptions } from './SearchResult';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: "1px solid #828785",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 5,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#828785"
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 5,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
    dropdownTitle: {
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
        marginBottom: "25px",
        textDecoration: "underline"
    },
});

export interface ISearchBoxProps<T>  extends WithStyles<typeof styles> {
    fuseOptions: FuseOptions<T>;
    searchData: any;
    showAvatar: boolean;
    maxDropdownHeight?: string;
    placeholder?: string;
    searchResultOptions?: ISearchResultOptions;
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

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}  ref={node => this.anchorEl = node}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder={this.props.placeholder || ""}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onChange={this.search}
                        onKeyDown={this.search}
                        onMouseDown={this.search}
                    />
                </div>
                {this.renderDropdown()}
            </div>
        );
    }

    search = (event: any) => {
        // close dropdown if esc key pressed
        if (event.keyCode === 27) {
            this.setState({
                showDropdown: false
            });
            return;
        }
        var searchKey = event.target.value;
        var showDropdown = false;
        if (searchKey.length > 0) {
            this.performFuseSearch(searchKey);
            showDropdown = true;
        }
        this.setState({
            showDropdown: showDropdown
        });
    }

    performFuseSearch = (searchKey: string) => {
        var options = this.props.fuseOptions;
        options.includeMatches = true;
        options.includeScore = true;
        var fuse = new Fuse(this.props.searchData, options);
        var result = fuse.search(searchKey);
        console.log("FUSE RESULTS", searchKey, result);
        this.setState({
            searchResults: result
        });
    }

    renderDropdown = () => {
        return <SearchDropdown
            anchorEl={this.anchorEl}
            data={this.state.searchResults}
            showDropdown={this.state.showDropdown}
            handleDropdownClose={this.handleDropdownClose} 
            maxDropdownHeight={this.props.maxDropdownHeight || "500px"}
            showAvatar={this.props.showAvatar} 
            searchResultOptions={this.props.searchResultOptions} />;
    }

    handleDropdownClose = (event: any) => {
        if (this.anchorEl && this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ showDropdown: false });
    };
}

export default (withStyles(styles)(SearchBox));