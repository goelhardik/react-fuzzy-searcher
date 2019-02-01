import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core/styles";
import * as Fuse from "fuse.js";
import { ISearchResultOptions } from "./SearchResult";
declare const styles: (theme: Theme) => Record<"root" | "search" | "searchIcon" | "inputRoot" | "inputInput" | "searchResultCount", import("@material-ui/core/styles/withStyles").CSSProperties>;
export interface ISearchBoxProps<T> extends WithStyles<typeof styles> {
    fuseOptions: Fuse.FuseOptions<T>;
    searchData: any;
    maxDropdownHeight?: string;
    placeholder?: string;
    searchResultOptions?: ISearchResultOptions;
    hideSearchResultCount?: boolean;
}
declare const _default: React.ComponentType<Pick<ISearchBoxProps<any>, "placeholder" | "fuseOptions" | "searchData" | "maxDropdownHeight" | "searchResultOptions" | "hideSearchResultCount"> & import("@material-ui/core").StyledComponentProps<"root" | "search" | "searchIcon" | "inputRoot" | "inputInput" | "searchResultCount">>;
export default _default;
