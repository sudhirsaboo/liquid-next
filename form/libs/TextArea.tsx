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

    /* static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = TextArea.getStoreValue(nextProps);
        if (value === null) value = "";
        return { prevProps: nextProps, value };
    } */
    onChange = (e) => {
        this.input.current.dirty = true;
        const value = e.target.value;
        this.setState({ value: value });
        if (this.props.onCommit) this.props.onCommit();
        if (!this.props.apply) {
            this.setStoreValue(value);
        }
    };

    getInputValue() {
        return this.state.value;
    }
    setValue(value) {
        this.setState({ value });
    }
    input: any = React.createRef();

    render() {
        const { rows, placeholder, name, required, apply, ...other } =
            this.props;

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
                    ref={this.input}
                    id={name}
                    style={this.props.style}
                    className={myClassNames}
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
