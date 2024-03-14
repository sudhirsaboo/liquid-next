import * as React from "react";

import Field from "./Field";

import { InputTextarea } from "primereact/inputtextarea";
import * as classnames from "classnames";

class TextArea extends Field {
    constructor(props) {
        super(props);
    }

    state = {
        value: TextArea.getStoreValue(this.props),
        valid: true,
    };

    static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = TextArea.getStoreValue(nextProps);
        if (value === null) value = "";
        return { prevProps: nextProps, value };
    }
    onChange = (e) => {
        this.refs.input["dirty"] = true;
        this.setState({ value: e });
        if (this.props.onCommit) this.props.onCommit();
        if (!this.props.apply) {
            this.setStoreValue(e);
        }
    };

    getInputValue() {
        return this.state.value;
    }
    setValue(value) {
        this.setState({ value });
    }
    render() {
        const { rows, placeholder, required, apply, ...other } = this.props;

        const myClassNames = classnames(
            this.props.className,
            "input-container",
            {
                "has-errors": !this.state.valid,
            }
        );
        return (
            <div className="input-container">
                <label htmlFor={name}>{placeholder}</label>

                <InputTextarea
                    id={name}
                    style={this.props.style}
                    className={myClassNames}
                    ref="input"
                    multiline
                    rows={rows}
                    required={required}
                    value={this.state.value}
                    {...other}
                    disabled={!this.isEditable()}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                >
                    {this.getValidationChildren()}
                </InputTextarea>
            </div>
        );
    }
}

export default TextArea;