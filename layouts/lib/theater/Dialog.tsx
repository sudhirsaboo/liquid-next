import React from "react";
import classnames from "classnames";

import Curtain from "../Curtain";

class Dialog2 extends React.Component<any, any> {
    isHidden(el) {
        return el.offsetParent === null;
    }

    isMobile() {
        if (this.isHidden(document.getElementById("mobile-indicator"))) {
            return false;
        }
        return true;
    }

    render() {
        const myClassNames = classnames(this.props.className, {
            theater: true,
            dialog: true,
            active: this.props.active || this.props.displayCondition,
            centered: true,
        });

        const { displayCondition, active, dismiss } = this.props;

        if (!displayCondition && !active) return null;

        return (
            <div
                className={myClassNames}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <Curtain
                    className="curtain"
                    onClick={dismiss}
                    active={active}
                    escapable={false}
                ></Curtain>

                <div className="centerCellWrap">{this.props.children}</div>
            </div>
        );
    }

    constructor(props) {
        super(props);
    }
}

/*Dialog2.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
};*/

export default Dialog2;
