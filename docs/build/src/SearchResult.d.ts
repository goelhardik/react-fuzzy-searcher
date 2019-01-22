import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core/styles";
declare const styles: (theme: Theme) => Record<"root" | "avatar" | "resultText" | "resultTitle" | "resultSubtitle" | "resultType", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface ISearchResultProps extends WithStyles<typeof styles> {
    showAvatar: boolean;
    fuseResult: any;
    takeTopMatches?: number;
}
declare const _default: React.ComponentType<Pick<ISearchResultProps, "showAvatar" | "fuseResult" | "takeTopMatches"> & import("@material-ui/core").StyledComponentProps<"root" | "avatar" | "resultText" | "resultTitle" | "resultSubtitle" | "resultType">>;
export default _default;
