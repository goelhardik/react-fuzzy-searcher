import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core/styles";
declare const styles: (theme: Theme) => Record<"root" | "subtitle" | "content" | "textField" | "searchBoxDemo" | "stepTitle" | "divider" | "settingsPane" | "settingTitle" | "showAvatarSetting" | "searchKeysSetting" | "settingSubtitle", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface ICustomInputDemoProps extends WithStyles<typeof styles> {
}
export declare function getSearchResultMatchKeys(): string;
export declare function getOtherDataSearchKeys(): string;
declare const _default: React.ComponentType<Pick<ICustomInputDemoProps, never> & import("@material-ui/core").StyledComponentProps<"root" | "subtitle" | "content" | "textField" | "searchBoxDemo" | "stepTitle" | "divider" | "settingsPane" | "settingTitle" | "showAvatarSetting" | "searchKeysSetting" | "settingSubtitle">>;
export default _default;
