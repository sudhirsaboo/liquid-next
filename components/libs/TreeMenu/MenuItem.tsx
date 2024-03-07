import * as React from "react";
import classnames from "classnames";

import Link from "./Link";
import gridIcon from "../../assets/grid.svg";
import Image from "next/image";

class MenuItem extends React.Component<any, any> {
  render() {
    const { dispatch, route, to, onClick, label, displayCondition } =
      this.props;

    const myClassNames = classnames(this.props.className, {
      "menu-item": true,
      "has-submenu": this.props.children != null,
    });

    return (
      <li className={myClassNames} onClick={onClick}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            minWidth: "0px",
          }}
        >
          <div style={{ color: "rgb(217, 217, 217)", paddingRight: "4px" }}>
            {<Image src={gridIcon} alt="::" />}
          </div>
          <Link
            displayCondition={displayCondition}
            dispatch={dispatch}
            to={to}
            onClick={onClick}
            route={route}
          >
            {label}
          </Link>
        </div>
        {this.props.children}
      </li>
    );
  }
}

export default MenuItem;
