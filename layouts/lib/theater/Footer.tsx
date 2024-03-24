import React from "react";
import classnames from "classnames";

class Footer extends React.Component<any, any> {
    constructor(args) {
        super(args);
    }

    render() {
        const myClassNames = classnames(this.props.className, {
            "flex-container overlay bottom": true,
            center: this.props.center,
        });
        return <div className={myClassNames}>{this.props.children}</div>;
    }
}

export default Footer;
