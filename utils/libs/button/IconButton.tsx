/**
 * Created by ssaboo on 3/31/16.
 */
import * as React from "react";
import * as classnames from "classnames";

import { IconButton as RawIconButton } from "react-toolbox/lib/button/IconButton";

class IconButton extends React.Component<any, any> {
    render() {
        if (this.props.displayCondition === false) return null;

        const myClassNames = classnames(this.props.className, {
            "icon-button": true,
        });

        return (
            <RawIconButton
                style={this.props.style}
                className={myClassNames}
                data-title={this.props.title || this.props.label}
                onClick={this.props.onClick}
            />
        );
    }
}

// export default Ripple({centered: true})(IconButton);
export default IconButton;
