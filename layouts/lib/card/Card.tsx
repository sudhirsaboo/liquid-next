import React from "react";
import classnames from "classnames";

class Card extends React.Component<any, any> {
  render() {
    const myClassNames = classnames(this.props.className, {
      "media-card": true,
      stretch: this.props.stretch,
    });

    return (
      <div
        style={this.props.style}
        className={myClassNames}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Card;
