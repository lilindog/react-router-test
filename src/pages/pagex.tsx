import React from "react";

export default class Pagex extends React.Component {

    to (path) {
        (this as any).props.history.push({path: path});
    }

    state = {
        input: ""
    }

    input (e) {
        this.setState({input: e.target.value});
    }

    alert () {
        alert(this.state.input);
    }

    render (): any {
        return (
            <div>
                <h1>pagex</h1>
                <input placeholder="测试keepAlive" onChange={this.input.bind(this)}/>
                <p onClick={this.alert.bind(this)}>alert</p>
                <div onClick={this.to.bind(this, "/page1/pagey")}>去往pagey</div>
            </div>
        );
    }

}