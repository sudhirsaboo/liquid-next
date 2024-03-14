import * as React from "react";
import * as classnames from "classnames";

import IconButton from "../button/IconButton";
import Auth from "../others/Auth";

class LikeIcon extends React.Component<any, any> {
  render() {
    const myClassNames = classnames(this.props.className, {
      "fa-star fa": true,
      ilike: this.props.on,
    });

    return (
      <IconButton
        className={myClassNames}
        tooltip="Like"
        onClick={this.props.onClick}
      />
    );
  }
}

export default Auth(LikeIcon, true);
