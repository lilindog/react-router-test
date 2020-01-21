import React from "react";

import MyRouter from "../components/my-router";

export default class Page1 extends React.Component {

    componentDidMount () {
        // console.log("page1 ---->>");
        // console.log(this.props);
    }

    to (path) {
        (this as any).props.history.push({path: path});
    }

    render (): any {
        return (
            <div>
                <h1>page1</h1>
                <p onClick={this.to.bind(this, "/page2")}>去往page2</p>
                <p onClick={this.to.bind(this, "/page1/pagex")}>去往pagex</p>
                <hr/>
                <div>
                    <MyRouter deep={1} routes={(this as any).props.route.children} transition={true}/>
                </div>
            </div>
        );
    }

}