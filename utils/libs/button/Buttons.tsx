import React from "react";

class Buttons extends React.Component<any, any> {
    render() {
        return <div className="button-bar">{this.props.children}</div>;
    }
}

export default Buttons;
