import * as React from "react";
import * as classnames from "classnames";

import IconButton from "../button/IconButton";

class PlayIcon extends React.Component<any, any> {
    render() {
        const myClassNames = classnames(this.props.className, {
            "fa-play fa": true,
            "fa-pause": this.props.on,
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

export default PlayIcon;
