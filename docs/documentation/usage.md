## Usage

Here is a sample usage

```js
import * as React from "react";
import SearchBox from "react-fuzzy-searcher";

function getSearchKeys() {
    return [
        {
            name: "snippet.channelTitle",
            weight: 0.4
        },
        {
            name: "snippet.tags",
            weight: 0.2
        },
        {
            name: "snippet.description",
            weight: 0.5
        }
    ];
}

export interface ISearchBoxDemoProps {
}

interface ISearchBoxDemoState {
    searchableData: string;
}

var sampleData = require("./data/sampleData.json");

class SearchBoxDemo extends React.Component<ISearchBoxDemoProps, ISearchBoxDemoState> {

    constructor(props: ISearchBoxDemoProps) {
        super(props);
        this.state = {
            searchableData: JSON.stringify(sampleData)
        }
    }

    public render() {
        const fuseOptions = {
            keys: getSearchKeys(),
            includeMatches: true,
            includeScore: true,
            threshold: 0.5
        };
        sampleData = sampleData.map((d: any, idx: number) => {
            d.onClick = () => console.log("Clicked");
            return d;
        });

        return (
            <SearchBox
                fuseOptions={fuseOptions}
                searchData={sampleData}
                placeholder="Search amongst the 50 most popular YouTube videos eg. 'football', 'ellen'.."
                searchResultOptions={{ showAvatar: true, searchResultTitleKey: "snippet.title", searchResultImageUrl: "snippet.thumbnails.default.url", searchResultMatchKeys: { "snippet.channelTitle": "Channel Title", "snippet.tags": "Tags", "snippet.description": "Description" } }}
            />
        );
    }
}

```