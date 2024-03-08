import React from "react";
import classnames from "classnames";

class CardMediaFooter extends React.Component<any, any> {
  render() {
    const myClassNames = classnames(this.props.className, {
      "overlay bottom card-media-footer": true,
      opaque: this.props.opaque,
    });

    return (
      <div className={myClassNames}>
        <div className="wrapper">{this.props.children}</div>
      </div>
    );
  }
}

export default CardMediaFooter;
