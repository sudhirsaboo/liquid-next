/**
 * Created by ssaboo on 3/31/16.
 */
import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import { IconButton as RawIconButton } from "react-toolbox/lib/button/IconButton";

class IconButton extends React.Component<any, any> {
    render() {
        if (this.props.displayCondition === false) return null;

        const myClassNames = classnames(this.props.className, {
            "icon-button": true,
        });
        const style = { boxSizing: "border-box" };

        return (
            <button className={myClassNames} onClick={this.props.onClick}>
                <FontAwesomeIcon
                    icon={this.props.icon}
                    style={Object.assign({}, this.props.style, style)}
                    data-title={this.props.title || this.props.label}
                />
            </button>
        );
    }
}

// export default Ripple({centered: true})(IconButton);
export default IconButton;
