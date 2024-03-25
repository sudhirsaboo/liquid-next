import React from "react";
import classnames from "classnames";

import Field from "./Field";
import { SelectField } from ".";

class Select extends Field {
    constructor(props) {
        super(props);
    }

    onChange = (e?) => {
        if (this.input.current) {
            this.input.current.dirty = true;
        }
        let val = null;
        if (e && e.target) val = e.target.value;

        if (!this.props.apply) {
            this.setStoreValue(val);
        }
        this.onApply(val);
    };

    renderOption(option, selected) {
        const { multiple } = this.props;

        if (!option || !option.id) {
            return null;
        }
        let highlight = false;
        if (multiple && selected) {
            highlight = selected.reduce((pre, cur) => {
                if (cur.id == option.id) {
                    return true;
                }
                return pre;
            }, false);
        } else {
            highlight = option.id == selected;
        }

        return (
            <option key={option.id} value={option.id} selected={highlight}>
                {option.name}
            </option>
        );
    }

    getFieldValue(value) {
        const { name, select, multiple, fgselect, wholeObject } = this.props;

        if (!value) value = this.getSubmitValue();

        // Getting the whole object
        if (wholeObject) {
            const { options } = this.props;
            let ret = null;

            // toto handle value  array also
            let selected = null;
            if (multiple) {
                selected = value.map((val) => {
                    return options[val];
                });
            } else if (options.length) {
                selected = options.filter((i) => {
                    return i.name == value;
                });
                ret = selected;
            } else if (options) {
                selected = options[value];
            }
            if (select) ret = { [select]: selected };
            if (fgselect) ret = { [fgselect]: ret };
            return ret;
        }
        // Getting the name value like organization: {id:1}
        let object = { [name]: value };
        if (select) object = { [select]: object };
        if (fgselect) object = { [fgselect]: object };
        return Object.assign({}, object);
    }

    renderOptions(selected) {
        // eslint-disable-next-line
        let { options, optionsId, playlist } = this.props;

        // Make a list of ids from the entities itself
        if (!optionsId && options) {
            optionsId = { [playlist]: { items: Object.keys(options) } };
        }
        if (!optionsId) {
            return;
        }
        const items = playlist in optionsId ? optionsId[playlist].items : [];

        const ops = items.map((optionId) => {
            return this.renderOption(options[optionId], selected);
        });

        return ops;
    }

    input: any = React.createRef();

    getInputValue() {
        const { multiple } = this.props;
        let value = null;

        if (multiple) {
            value = [];
            const selections = this.input.current["selectedOptions"];
            for (let i = 0; i < selections.length; i++) {
                value.push(selections[i].value);
            }
            return value;
        }

        if (this.input.current) {
            if (this.input.current.getValue) {
                value = this.input.current.getValue();
            } else {
                value = this.input.current.value;
            }
        }
        return value;
    }

    renderRO() {
        const { type, name, multiple, select, label } = this.props;

        const view = { class: "test" };
        const value = SelectField.getStoreValue(this.props);

        const myClassNames = classnames(this.props.className, {
            "has-errors": !this.state.valid,
            "display-field": true,
        });

        return (
            <div className={myClassNames}>
                <label data-name={name} className="md-no-float control-label">
                    {label}
                </label>

                <select
                    ref={this.input}
                    disabled
                    data-type={type}
                    className={"display-input" + view.class}
                    name={`${select}-${name}`}
                    multiple={multiple}
                >
                    <option></option>
                    {this.renderOptions(value)}
                </select>

                {this.getValidationChildren()}
            </div>
        );
    }

    render() {
        const { type, name, required, multiple, select, label, editable } =
            this.props;

        const view = { class: "test" };
        const value = SelectField.getStoreValue(this.props);

        const myClassNames = classnames(
            this.props.className,
            "input-container",
            {
                "has-errors": !this.state.valid,
            }
        );

        if (editable == false) return this.renderRO();

        return (
            <div className={myClassNames}>
                <label data-name={name} className="md-no-float control-label">
                    {label} {required ? "*" : ""}
                </label>

                <select
                    ref={this.input}
                    data-type={type}
                    className={"display-input" + view.class}
                    name={`${select}-${name}`}
                    required={required}
                    multiple={multiple}
                    onChange={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                >
                    <option></option>
                    {this.renderOptions(value)}
                </select>

                {this.getValidationChildren()}
            </div>
        );
    }
}

export default Select;
/**
 * Created by ssaboo on 2/29/16.
 */
