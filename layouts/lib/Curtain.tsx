import React, { useEffect } from "react";
import classnames from "classnames";
import "./Curtain.scss";

export const Curtain = (props: any) => {
  let escKeyListener: boolean = false;

  const handleEscKey = (e: {
    which: number;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const { active } = props;

    if (active || active == null) {
      if (e.which === 27) {
        e.preventDefault();
        e.stopPropagation();
        props.onClick(e); // Need fix.: Esce on (tags) field alsow closed dialg and also all curtains are closed..
      }
    }
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    const { escapable } = props;

    if (!escapable) {
      // to prevent multiple dialog curtain getting closed.
    } else {
      escKeyListener = true;
      document.body.addEventListener("keydown", handleEscKey);
    }
    return () => {
      // Anything in here is fired on component unmount.
      if (escKeyListener) {
        document.body.removeEventListener("keydown", handleEscKey);
        escKeyListener = false;
      }
    };
  }, []);

  //render

  const myClassNames = classnames(props.className, {
    curtain: true,
  });

  const { onClick } = props;

  return (
    <div className={myClassNames} onClick={onClick}>
      <button
        className="curtain-close md-icon-button"
        aria-label="Close"
        onClick={onClick}
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

export default Curtain;
