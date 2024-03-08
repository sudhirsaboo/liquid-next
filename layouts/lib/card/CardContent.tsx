import React from "react";
import classnames from "classnames";

class CardContent extends React.Component<any, any> {
  render() {
    const myClassNames = classnames(this.props.className, {
      "media-card-content": true,
      centered: this.props.centered,
    });

    return <div className={myClassNames}>{this.props.children}</div>;
  }
}

export default CardContent;
