import React from "react";
import classnames from "classnames";

import IconButton from "../button/IconButton";
// import Auth from "../others/Auth";

class LikeIcon extends React.Component<any, any> {
    render() {
        const myClassNames = classnames(this.props.className, {
            ilike: this.props.on,
        });

        return (
            <IconButton
                icon="fa-star"
                className={myClassNames}
                tooltip="Like"
                onClick={this.props.onClick}
            />
        );
    }
}

//export default Auth(LikeIcon, true);
export default LikeIcon;
