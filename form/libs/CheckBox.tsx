import * as React from "react";
import { Checkbox as LibCheckbox } from "primereact/checkbox";
import Field from "./Field";

class CheckBox extends Field {
    constructor(props) {
        super(props);
    }
    static toBoolean(value) {
        if (value === "true" || value === true) {
            return true;
        }
        return false;
    }
    state = {
        //checked:this.toBoolean( this.getStoreValue()),
        checked:
            this.props.checked != undefined
                ? this.props.checked
                : CheckBox.toBoolean(CheckBox.getStoreValue(this.props, null)),
    };

    /* static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = CheckBox.getStoreValue(nextProps, nextProps);
        if (value === null) value = false;
        return { prevProps: nextProps, checked: value };
    } */
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

    handleChange = (e) => {
        this.setState({ ...this.state, checked: e.checked });

        this.onChange({ target: { value: e.checked } });
    };

    input: any = React.createRef();

    render() {
        const { label, name } = this.props;

        return (
            <div className="input-container checkbox-field">
                <label
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        height: "18px",
                        alignItems: "center",
                    }}
                >
                    <LibCheckbox
                        id={name}
                        ref={this.input}
                        checked={CheckBox.toBoolean(this.state.checked)}
                        onChange={this.handleChange}
                        disabled={this.props.editable === false}
                    ></LibCheckbox>
                    <span style={{ marginLeft: "10px" }} htmlFor={name}>
                        {label}
                    </span>
                </label>
            </div>
        );
    }
}

export default CheckBox;
