import React from "react";
import Field from "./Field";

import classnames from "classnames";

class DisplayField extends Field {
    getInputValue() {
        throw new Error("Method not implemented.");
    }
    input: any;

    constructor(props) {
        super(props);
    }

    isEditable() {
        return false;
    }

    state = {
        value: DisplayField.getFormattedValue(this.props),
    };

    static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = DisplayField.getFormattedValue(nextProps);
        if (value === null) value = "";
        return { prevProps: nextProps, value };
    }

    render() {
        const { type, name, label } = this.props;

        const myClassNames = classnames(this.props.className, {
            "display-field": true,
            [type]: true,
        });

        return (
            <div className={myClassNames}>
                <label data-name={name}>{label}</label>

                <input readOnly name="name" value={this.state.value}></input>
            </div>
        );
    }
}

export default DisplayField;
