import * as React from "react";
import classnames from "classnames";
import { constructUrl } from "../../utils/RouteUtils";

class Link extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  onClick(e: any) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const { children, route, title, to, displayCondition } = this.props;

    let href = "/#/";
    if (to) {
      if (to.startsWith("/")) {
        href = `/#${to}`;
      } else {
        href = `/#/${to}`;
      }
    } else if (route) href = `/#/${constructUrl(route)}`;

    if (displayCondition === false) {
      return null;
    }

    const myClassNames = classnames(this.props.className, {
      "link--active": this.props.active,
    });

    return (
      <a
        className={myClassNames}
        href={href}
        onClick={this.onClick.bind(this)}
        title={title ? title : ""}
      >
        {children}
      </a>
    );
  }
}

export default Link;
