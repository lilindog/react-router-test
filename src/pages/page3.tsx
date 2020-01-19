import React from "react";

export default class Page1 extends React.Component {

    to (path) {
        (this as any).props.history.push({path: path});
    }

    render (): any {
        return (
            <h1>page3</h1>
        );
    }

}