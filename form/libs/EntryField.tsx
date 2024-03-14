import * as React from "react";
import * as classnames from "classnames";
import Field from "./Field";
import Input from "react-toolbox/lib/input";

class EntryField extends Field {
    constructor(props) {
        super(props);
    }

    state = {
        value: EntryField.getStoreValueChecked(this.props),
        valid: true
    };

    static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }
        let value = EntryField.getStoreValueChecked(nextProps);
        if (value === null) value = "";
        return { prevProps: nextProps, value };
    }
    getInputValue() {
        return this.state.value;
    }

    onChange = (e) => {
        let value = null;
        if (e && e.target) value = e.target.value;
        else value = e;

        this.refs.input["dirty"] = true;
        this.setState({ value });

        if (!this.props.apply) {
            this.setStoreValue(value);
        }
        if (this.props.onCommit) this.props.onCommit();
    };

    render() {
        const { type, name, required, label } = this.props;

        const myClassNames = classnames(
            this.props.className,
            "input-container",
            {
                "has-errors": !this.state.valid
            }
        );

        return (
            <div className={myClassNames}>
                <Input
                    ref="input"
                    type={type}
                    label={label}
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
