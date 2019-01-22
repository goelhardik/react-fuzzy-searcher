import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%'
    }
});

export interface ISearchBoxDemoProps extends WithStyles<typeof styles> {
}

class SearchBoxDemo extends React.Component<ISearchBoxDemoProps, {}> {

    render() {
        const { classes } = this.props;

        return <div className={classes.root}>DEMO!</div>;
    }
}

export default (withStyles(styles)(SearchBoxDemo));