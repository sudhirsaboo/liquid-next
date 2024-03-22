import React from "react";
import classnames from "classnames";
import Field from "./Field";
import { InputText } from "primereact/inputtext";

class EntryField extends Field {
    constructor(props) {
        super(props);
    }

    state = {
        value: EntryField.getStoreValue(this.props),
        valid: true,
    };

    setValue(v) {
        this.setState({ value: v });
    }

    /* static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = EntryField.getStoreValue(nextProps);
        if (value === null) value = "";
        return { prevProps: nextProps, value };
    } */

    getInputValue() {
        return this.state.value;
    }

    onChange = (e) => {
        let value = null;
        if (e && e.target) value = e.target.value;
        else value = e;

        this.input.current.dirty = true;
        this.setState({ value });

        if (!this.props.apply) {
            this.setStoreValue(value);
        }
        if (this.props.onCommit) this.props.onCommit();
    };

    input: any = React.createRef();

    render() {
        const { type, name, required, label } = this.props;

        const myClassNames = classnames(
            this.props.className,
            "input-container",
            {
                "has-errors": !this.state.valid,
            }
        );

        return (
            <div className={myClassNames}>
                <label htmlFor={name}>{label}</label>

                <InputText
                    data-testid={`test-${name}`}
                    ref={this.input}
                    id={name}
                    type={type}
                    className={"display-input"}
                    name={name}
                    required={required}
                    value={this.state.value}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                />
                {this.getValidationChildren()}
            </div>
        );
    }
}

export default EntryField;
