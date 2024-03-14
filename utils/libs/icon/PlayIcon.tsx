import * as React from "react";
import classnames from "classnames";

import IconButton from "../button/IconButton";

class PlayIcon extends React.Component<any, any> {
    render() {
        const myClassNames = classnames(this.props.className, {});
        const icon = this.props.on ? "fa-pause" : "fa-play";

        return (
            <IconButton
                icon={icon}
                className={myClassNames}
                tooltip={this.props.tooltip}
                onClick={this.props.onClick}
            />
        );
    }
}

export default PlayIcon;
