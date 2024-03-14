import * as React from "react";

import IconButton from "../button/IconButton";

class RateIcon extends React.Component<any, any> {
    dismiss() {
        this.refs.addOverlay["hide"]();
    }

    render() {
        const { onClick } = this.props;
        if (onClick) {
            return (
                <IconButton
                    iconClassName={"fa-star-o fa"}
                    tooltip={"Rate"}
                    tooltipPosition="bottom-right"
                    onClick={onClick}
                />
            );
        }
        return null;
    }
}

export default RateIcon;
