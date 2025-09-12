import React from "react";
import DisplayField from "./DisplayField";

class DateDisplayField extends DisplayField {
    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = DateDisplayField.getFormattedValue(nextProps);
        if (value === null) value = "";
        return { prevProps: nextProps, value };
    }
    state = {
        dateActive: false,
        format: this.props.format,
        value: DateDisplayField.getFormattedValue(this.props),
        prevProps: null,
    };

    static defaultProps = {
        format: "MM/DD/YYYY",
    };
    input: any = React.createRef();

    render() {
        const { type, name, label, displayCondition } = this.props;

        if (displayCondition === false) {
            return null;
        }
        return (
            <div>
                <label data-name={name}>{label}</label>

                <input
                    ref={this.input}
                    readOnly
                    type={type}
                    className={"display-input"}
                    name={name}
                    defaultValue={this.state.value}
                />
            </div>
        );
    }
}

export default DateDisplayField;
