import React from "react";
import classnames from "classnames";

class Button extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        type: "button",
    };
    onClick = (e: any) => {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };
    render() {
        const { name, disabled, label, type, style, displayCondition } =
            this.props;

        if (displayCondition != null && displayCondition === false) {
            return null;
        }

        const myClassNames = classnames(this.props.className, {
            btn: true,
            [`btn--${name}`]: true,
        });

        return (
            <button
                className={myClassNames}
                disabled={disabled}
                type={type}
                style={style}
                onClick={this.onClick.bind(this)}
            >
                {label}
                {this.props.children}
            </button>
        );
    }
}

export default Button;
