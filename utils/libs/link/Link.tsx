import * as React from "react";
import classnames from "classnames";
import { constructUrl } from "@/liquid-utils/RouteUtils";

export default function Link(props: {
  onClick?: any;
  active?: any;
  children?: any;
  route?: any;
  title?: any;
  to?: any;
  displayCondition?: any;
  className?: any;
}) {
  const onClick = (e: any) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const { children, route, title, to, displayCondition } = props;

  let href = "#";
  if (to) {
    href = to;
  } else if (route) href = `/#/${constructUrl(route)}`;

  if (displayCondition === false) {
    return null;
  }

  const myClassNames = classnames(props.className, {
    "link--active": props.active,
  });

  return (
    <a
      className={myClassNames}
      href={href}
      onClick={onClick}
      title={title ? title : ""}
    >
      {children}
    </a>
  );
}
