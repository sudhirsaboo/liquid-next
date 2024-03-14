import * as React from "react";
import * as classnames from "classnames";

import IconButton from "../button/IconButton";

class CartIcon extends React.Component<any, any> {
  render() {
    const myClassNames = classnames(this.props.className, {
      "fa-shopping-cart  fa": true,
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

export default CartIcon;
/**
 * Created by ssaboo on 4/8/16.
 */
