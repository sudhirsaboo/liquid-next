import React from "react";
import classnames from "classnames";

class CardFooter extends React.Component<any, any> {
  render() {
    const myClassNames = classnames(this.props.className, {
      "card-footer": true,
      "media-card-footer": true,
      opaque: this.props.opaque,
    });

    return <div className={myClassNames}>{this.props.children}</div>;
  }
}

export default CardFooter;
