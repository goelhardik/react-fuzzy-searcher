import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IMarkdownGridSection } from "./MarkdownGrid";

const styles = (theme: Theme) => createStyles({
    sectionHeading: {
        fontSize: "38px",
        fontWeight: 200,
        color: "rgba(0, 0, 0, .77)"
    }
});

export interface IMarkdownSectionProps extends WithStyles<typeof styles> {
    section: IMarkdownGridSection;
}

interface IMarkdownSectionState {
    expanded: boolean;
}

class MarkdownSection extends React.Component<IMarkdownSectionProps, IMarkdownSectionState> {

    constructor(props: IMarkdownSectionProps) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    public render() {
        const { classes, section } = this.props;
        const { expanded } = this.state;

        return (
            <ExpansionPanel expanded={expanded} onChange={this.handleChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    {!this.state.expanded && <Typography className={classes.sectionHeading}>{section.title}</Typography>}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

    handleChange = (event: React.ChangeEvent, expanded: boolean) => {
        this.setState({
            expanded: expanded
        });
    };
}

export default (withStyles(styles)(MarkdownSection));
