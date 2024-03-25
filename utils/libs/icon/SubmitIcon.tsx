import React from "react";
import classnames from "classnames";

import IconButton from "../button/IconButton";

class SubmitIcon extends React.Component<any, any> {
    render() {
        const myClassNames = classnames(this.props.className, {
            "fa-comment fa": true,
            ilike: this.props.on,
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

export default SubmitIcon;
