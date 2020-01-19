import React from "react";

export default class Pagez extends React.Component {

    to (path) {
        (this as any).props.history.push({path: path});
    }

    render (): any {
        return (
            <div>
                <h1>pagez</h1>
                <div onClick={this.to.bind(this, "/page2")}>去往page2</div>
            </div>
        );
    }

}