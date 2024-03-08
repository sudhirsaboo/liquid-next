import React from "react";
import classnames from "classnames";

import Curtain from "./Curtain";
import "./Theater.scss";

export const Theater = (props: any) => {
  const { dismiss, className } = props;

  const myClassNames = classnames(props.className, {
    theater: true,
    centered: true,
  });

  return (
    <div
      className={myClassNames}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Curtain className="curtain" onClick={dismiss}></Curtain>

      <div className="mobile-curtain">
        <button
          className="curtain-close md-icon-button"
          aria-label="Close"
          onClick={dismiss}
        >
          <i className="fa fa-chevron-left"></i>
        </button>
      </div>

      {props.children}
    </div>
  );
};

export default Theater;
