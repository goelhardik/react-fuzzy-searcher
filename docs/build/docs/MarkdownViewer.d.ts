import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core/styles";
declare const styles: (theme: Theme) => Record<"root", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface IMarkdownViewerProps extends WithStyles<typeof styles> {
}
declare const _default: React.ComponentType<Pick<IMarkdownViewerProps, never> & import("@material-ui/core/styles").StyledComponentProps<"root">>;
export default _default;
