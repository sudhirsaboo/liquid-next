import React from "react";

class Close extends React.Component<any, any> {
    render() {
        if (this.props.onClick) {
            return (
                <button
                    className="curtain-close md-icon-button"
                    aria-label="Close"
                    onClick={this.props.onClick}
                >
                    <i className="fa fa-times"></i>
                </button>
            );
        }
        return null;
    }
}

export default Close;
