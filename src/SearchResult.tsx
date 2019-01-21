import * as React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "max-content auto max-content",
        gridolumnGap: "15px",
        width: "100%"
    },
    avatar: {
        justifySelf: "start"
    },
    resultText: {
        overflow: "hidden"
    },
    resultTitle: {
        fontWeight: "bold",
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
        fontSize: "18px"
    },
    resultSubtitle: {
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
        fontSize: "16px",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    resultType: {
        fontFamily: "Georgia, Helvetica, Tahoma, Sans-Serif, Gaura Times, Serif",
        fontStyle: "italic",
        justifySelf: "end"
    }
});

export interface ISearchResultProps extends WithStyles<typeof styles> {
    showAvatar: boolean;
    fuseResult: any;
    takeTopMatches?: number;
}

interface ISearchResultState {

}

class SearchResult extends React.Component<ISearchResultProps, ISearchResultState> {

    render = () => {
        const { classes } = this.props;

        return <div className={classes.root}>
            <Avatar src={this.props.fuseResult.item.imageUrl} className={classes.avatar} />
            <div className={classes.resultText}>
                <Typography component="p" className={classes.resultTitle}>
                    {this.props.fuseResult.item.title}
                </Typography>
                {this.props.fuseResult.matches.slice(0, this.props.takeTopMatches || 3)
                    .map((match: any, idx: number) => this.renderMatchLine(match))}
            </div>
            <div className={classes.resultType}>
                {this.props.fuseResult.item.resultType &&
                    <Typography component="p">{this.props.fuseResult.item.resultType}</Typography>}
            </div>
        </div>;
    }


    renderMatchLine = (match: any) => {
        if (!match) {
            return null;
        }
        const { classes } = this.props;

        var value = match.value;
        var spans = [<span>{`...${value.substring(0, match.indices[0][0])}`}</span>];
        for (var i = 0; i < match.indices.length; i++) {
            var curInd = match.indices[i];
            var nextInd = match.indices[i + 1];
            var matchedVal = <span style={{ backgroundColor: "#fff2a8" }}>{value.substring(curInd[0], curInd[1] + 1)}</span>;
            var remaining = <span>{value.substring(curInd[1] + 1, nextInd && nextInd[0] || value.length)}</span>
            spans.push(matchedVal);
            spans.push(remaining);
        }
        spans.push(<span>...</span>);
        return <Typography component="p" className={classes.resultSubtitle}>
            {spans.map((d, idx) => d)}
        </Typography>
    }

}

export default withStyles(styles)(SearchResult);
