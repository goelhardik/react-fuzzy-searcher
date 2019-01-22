
import * as React from "react";
import * as ReactDOM from "react-dom";
import SearchBoxDemo from "./SearchBoxDemo";

console.log("INDE JS CALLED");
console.log(document);
console.log(document.getElementById("root"));
ReactDOM.render(
    React.createElement(SearchBoxDemo),
    document.getElementById("root")
);