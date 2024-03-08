import React from "react";
import classnames from "classnames";
import "./Stage.scss";

export const Stage = (props: any) => {
  const { displayCondition, size, className } = props;

  const myClassNames = classnames(className, {
    "stage ": true,
  });

  if (displayCondition === false) {
    return null;
  }

  return (
    <div className={myClassNames} data-size={size}>
      {props.children}
    </div>
  );
};

export default Stage;
