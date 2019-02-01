import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core/styles";
declare const styles: (theme: Theme) => Record<"root" | "headerSection" | "title" | "subtitle" | "githubStarButton" | "youtubeSearchBoxDemo" | "content" | "textField" | "searchBoxDemo" | "documentation", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface ISearchBoxDemoProps extends WithStyles<typeof styles> {
}
export declare function getOtherDataSearchKeys(): {
    name: string;
    weight: number;
}[];
export declare function getYoutubeSearchKeys(): {
    name: string;
    weight: number;
}[];
declare const _default: React.ComponentType<Pick<ISearchBoxDemoProps, never> & import("@material-ui/core").StyledComponentProps<"root" | "headerSection" | "title" | "subtitle" | "githubStarButton" | "youtubeSearchBoxDemo" | "content" | "textField" | "searchBoxDemo" | "documentation">>;
export default _default;
