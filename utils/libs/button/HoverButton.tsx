import React from "react";
import Button from "./Button";

class HoverButton extends Button {
    constructor(props) {
        super(props);
    }

    changeLabel(e) {
        const { hoverLabel } = this.props;
        if (hoverLabel) {
            e.target.innerText = hoverLabel;
        }
    }
    revertLabel(e) {
        const { label } = this.props;
        e.target.innerText = label;
    }

    render() {
        const { disabled, onClick, label, displayCondition } = this.props;

        if (displayCondition != null && displayCondition === false) {
            return null;
        }

        return (
            <button
                className="hover-btn btn"
                disabled={disabled}
                fade-in
                onClick={onClick}
                onFocus={this.changeLabel.bind(this)}
                onBlur={this.revertLabel.bind(this)}
                onMouseOver={this.changeLabel.bind(this)}
                onMouseOut={this.revertLabel.bind(this)}
            >
                {label}
            </button>
        );
    }
}

export default HoverButton;
