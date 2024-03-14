import * as React from "react";
import * as classnames from "classnames";

import IconButton from "../button/IconButton";
import Auth from "../others/Auth";

class SubmitIcon extends React.Component<any, any> {
    render() {
        const myClassNames = classnames(this.props.className, {
            "fa-comment fa": true,
            ilike: this.props.on
        });

        return (
            <IconButton
                style={this.props.style}
                className={myClassNames}
                tooltip="Like"
                onClick={this.props.onClick}
            />
        );
    }
}

export default Auth(SubmitIcon, true);