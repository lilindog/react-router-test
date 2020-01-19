import React from "react";

export default class Pagey extends React.Component {

    to (path) {
        (this as any).props.history.push({path: path});
    }

    render (): any {
        return (
            <div>
                <h1>pagey</h1>
                <div onClick={this.to.bind(this, "/page1/pagez")}>去往pagez</div>
            </div>
        );
    }

}