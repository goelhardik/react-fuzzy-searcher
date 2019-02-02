import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core/styles";
import { IMarkdownGridSection } from "./MarkdownGrid";
declare const styles: (theme: Theme) => Record<"sectionHeading", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface IMarkdownSectionProps extends WithStyles<typeof styles> {
    section: IMarkdownGridSection;
    usePanel?: boolean;
}
declare const _default: React.ComponentType<Pick<IMarkdownSectionProps, "section" | "usePanel"> & import("@material-ui/core").StyledComponentProps<"sectionHeading">>;
export default _default;
