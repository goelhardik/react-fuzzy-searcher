import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core/styles";
import { ISearchResultOptions } from "./SearchResult";
declare const styles: (theme: Theme) => Record<"root" | "dropdownContainer" | "grow" | "menuItem" | "noResultsText", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface ISearchDropdownProps extends WithStyles<typeof styles> {
    showDropdown: boolean;
    anchorEl: HTMLDivElement | null;
    handleDropdownClose(event: any): void;
    data: any;
    maxDropdownHeight: string;
    showAvatar: boolean;
    searchResultOptions?: ISearchResultOptions;
}
declare const _default: React.ComponentType<Pick<ISearchDropdownProps, "data" | "showDropdown" | "showAvatar" | "maxDropdownHeight" | "searchResultOptions" | "anchorEl" | "handleDropdownClose"> & import("@material-ui/core").StyledComponentProps<"root" | "dropdownContainer" | "grow" | "menuItem" | "noResultsText">>;
export default _default;
