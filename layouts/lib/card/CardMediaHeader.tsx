import React from "react";

class CardMediaHeader extends React.Component<any, any> {
  render() {
    return (
      <div className="overlay top flex-container">{this.props.children}</div>
    );
  }
}

export default CardMediaHeader;
