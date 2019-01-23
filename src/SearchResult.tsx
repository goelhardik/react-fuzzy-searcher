import * as React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core/styles";
var deepValue = require("./Util/deepValue");
var colors = require("./Common.scss");

const styles = (theme: Theme) => createStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "max-content auto max-content",
        gridolumnGap: "15px",
        width: "100%"
    },
    avatar: {
        justifySelf: "start",
        marginRight: "10px"
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

export interface ISearchResultOptions {
    searchResultTitleKey?: string;
    searchResultMatchKeys?: {};
    searchResultImageUrl?: string;
}

export interface ISearchResultProps extends WithStyles<typeof styles> {
    showAvatar: boolean;
    fuseResult: any;
    takeTopMatches?: number;
    searchResultOptions?: ISearchResultOptions;
}

interface ISearchResultState {

}

class SearchResult extends React.Component<ISearchResultProps, ISearchResultState> {

    public render() {
        const { classes, searchResultOptions } = this.props;

        return (<div className={classes.root}>
            {this.props.showAvatar && <Avatar src={this.getImageUrl(searchResultOptions)} className={classes.avatar} />}
            <div className={classes.resultText}>
                <Typography component="p" className={classes.resultTitle}>
                    {this.getSearchResultTitle(searchResultOptions)}
                </Typography>
                {this.props.fuseResult.matches.slice(0, this.props.takeTopMatches || 3)
                    .map((match: any, idx: number) => this.renderMatchLine(match))}
            </div>
            <div className={classes.resultType}>
                {this.props.fuseResult.item.resultType &&
                    <Typography component="p">{this.props.fuseResult.item.resultType}</Typography>}
            </div>
        </div>);
    }

    private getImageUrl = (searchResultOptions: ISearchResultOptions | undefined) => {
        let imageUrl = this.props.fuseResult.item.imageUrl;
        if (searchResultOptions && searchResultOptions.searchResultImageUrl) {
            imageUrl = deepValue(this.props.fuseResult.item, searchResultOptions.searchResultImageUrl);
        }

        return imageUrl;
    }

    private getSearchResultTitle = (searchResultOptions: ISearchResultOptions | undefined) => {
        let title = this.props.fuseResult.item.title;
        if (searchResultOptions && searchResultOptions.searchResultTitleKey) {
            title = deepValue(this.props.fuseResult.item, searchResultOptions.searchResultTitleKey);
        }

        return title;
    }


    private renderMatchLine = (match: any) => {
        if (!match) {
            return null;
        }
        const { classes, searchResultOptions } = this.props;

        let key = "";
        if (searchResultOptions && searchResultOptions.searchResultMatchKeys) {
            key = searchResultOptions.searchResultMatchKeys[match.key];
        }
        const value = match.value;
        const spans = [<span key={"match-index-0"} >{`${key} : ...${value.substring(0, match.indices[0][0])}`}</span>];
        for (let i = 0; i < match.indices.length; i++) {
            const curInd = match.indices[i];
            const nextInd = match.indices[i + 1];
            const matchedVal = <span style={{ backgroundColor: colors.matchHighlightColor }} key={`match-index-highlight-${i}`}>{value.substring(curInd[0], curInd[1] + 1)}</span>;
            const remaining = <span key={`match-index-${i}`}>{value.substring(curInd[1] + 1, nextInd && nextInd[0] || value.length)}</span>;
            spans.push(matchedVal);
            spans.push(remaining);
        }
        spans.push(<span>...</span>);
        return (
            <Typography component="p" className={classes.resultSubtitle}>
                {spans.map((d, idx) => d)}
            </Typography>
        );
    }

}

export default withStyles(styles)(SearchResult);
