import React from "react";

export default class Page1 extends React.Component {

    to (path) {
        (this as any).props.history.push({path: path});
    }

    render (): any {
        return (
            <div>
                <h1>page2</h1>
                <p onClick={this.to.bind(this, "/page3")}>去往page3</p>
            </div>
        );
    }

}