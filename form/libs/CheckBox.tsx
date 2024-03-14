import * as React from "react";
import MDCheckBox from "react-toolbox/lib/checkbox";
import Field from "./Field";

class CheckBox extends Field {
    constructor(props) {
        super(props);
    }

    state = {
        //checked:this.toBoolean( this.getStoreValue()),
        checked:
            this.props.checked != undefined
                ? this.props.checked
                : this.toBoolean(CheckBox.getStoreValue(this.props, null))
    };

    static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = CheckBox.getStoreValue(nextProps, nextProps);
        if (value === null) value = false;
        return { prevProps: nextProps, checked: value };
    }
    static getStoreValue(p, n) {
        const val = Field.getStoreValue(p, n);
        if (n?.checked === true) {
            return true;
        } else {
            return val;
        }
    }
    getInputValue() {
        return this.state.checked;
    }

    handleChange = (value) => {
        this.setState({ ...this.state, checked: value });

        this.onChange({ target: { value: value } });
    };

    render() {
        const { label } = this.props;

        return (
            <div className="checkbox-field">
                <MDCheckBox
                    ref="input"
                    label={label}
                    checked={this.toBoolean(this.state.checked)}
                    onChange={this.handleChange}
                    disabled={this.props.editable === false}
                ></MDCheckBox>
            </div>
        );
    }
}

export default CheckBox;
