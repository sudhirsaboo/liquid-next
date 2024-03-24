import React from "react";
import classnames from "classnames";

import IconButton from "../button/IconButton";

class MaxIcon extends React.Component<any, any> {
    render() {
        const myClassNames = classnames(this.props.className, {
            "fa-expand fa": true,
            "fa-compress": this.props.on,
        });

        return (
            <IconButton
                className={myClassNames}
                tooltip={this.props.tooltip}
                onClick={this.props.onClick}
            />
        );
    }
}

export default MaxIcon;
/**
 * Created by ssaboo on 4/17/16.
 */
