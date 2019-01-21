import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Grow, Paper, Popper, MenuItem, MenuList, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        zIndex: 2147483647,
        overflowY: "scroll"
    },
    dropdownContainer: {
        // boxShadow: "0 0 0 100vmax rgba(0,0,0,.3)"
    },
    grow: {
        maxHeight: "500px",
        overflowY: "auto"
    },
    menuItem: {
        height: "auto"
    }
});

export interface ISearchDropdownProps extends WithStyles<typeof styles> {
    showDropdown: boolean;
    anchorEl: HTMLDivElement | null;
    handleDropdownClose(event: any): void;
    data: any;
    maxDropdownHeight: string;
}

interface ISearchDropdownState {

}

class SearchDropdown extends React.Component<ISearchDropdownProps, ISearchDropdownState> {

    render = () => {
        const { classes } = this.props;

        return <Popper
            open={this.props.showDropdown}
            anchorEl={this.props.anchorEl}
            transition
            disablePortal
            className={classes.root}
            style={{
                width: this.props.anchorEl && this.props.anchorEl.clientWidth || "100%",
            }}>
            {({ TransitionProps: TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        maxHeight: this.props.maxDropdownHeight,
                        overflowY: "auto"
                    }}
                >
                    <Paper className={classes.dropdownContainer}>
                        <ClickAwayListener onClickAway={this.props.handleDropdownClose}>
                            <MenuList dense={false} style={{ padding: 0, borderWidth: "3px" }}>
                                {this.props.data.map((d: any, idx: number) => {
                                    return <div>
                                        {
                                            d.item.onClick && this.renderMenuItemWithoutLink(d, idx)
                                            || this.renderMenuItemWithLink(d, idx)
                                        }
                                        <Divider />
                                    </div>;
                                })}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    }

    renderMenuItemWithoutLink = (d: any, idx: number) => {
        const { classes } = this.props;

        return <MenuItem
            onClick={(event: any) => this.handleMenuItemClick(d, idx, event)}
            classes={{
                root: classes.menuItem
            }}>
            {d.item.onRender(d)}
        </MenuItem>
    }

    renderMenuItemWithLink = (d: any, idx: number) => {
        const { classes } = this.props;

        return <MenuItem
            onClick={(event: any) => this.handleMenuItemClick(d, idx, event)}
            classes={{
                root: classes.menuItem
            }}
            component={({ innerRef, ...props }) => <Link {...props} to={d.item.onClickLink} />}>
            {d.item.onRender(d)}
        </MenuItem>
    }

    handleMenuItemClick = (d: any, idx: number, event: any) => {
        if (d.item.onClick) {
            d.item.onClick();
        }
        this.props.handleDropdownClose(event);
    }
}

export default withStyles(styles)(SearchDropdown);