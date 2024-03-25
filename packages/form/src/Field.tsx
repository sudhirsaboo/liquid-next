import React from "react";
import moment from "moment";
import Validator from "./Validator";
import NumberUtils from "liquid-util/NumberUtils";

abstract class Field extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { valid: true };
    }
    abstract getInputValue();
    input: any = React.createRef();
    //abstract clear();

    // Used By TextArea to disble if not editable
    isEditable() {
        if (this.props.editable === "false" || this.props.editable === false) {
            return false;
        }
        return true;
    }

    // Not used need rewrite
    clear() {
        if (this.input.current) {
            if (this.input.current.setValue) this.input.current.setValue("");
            this.input.current.value = "";
        }
        if (this["setValue"]) {
            this["setValue"]("");
        }
    }

    onApply(value?) {
        if (this.props.apply) {
            this.props.apply(Object.assign({}, this.getFieldValue(value)));
        }
    }

    // Called by Checkbox / Slider
    onChange = (e?, b?, c?) => {
        if (this.input.current) {
            this.input.current.dirty = true;
        }
        let val = null;
        if (e && e.target) val = e.target.value;
        this.onApply(val);
    };

    onBlur() {
        this.validate();
        this.onApply();
    }

    // Object {name: value}
    getValue(props?) {
        return this.getFieldValue();
    }

    getSubmitValue() {
        return this.getInputValue();
    }

    collect(value?) {
        return this.getFieldValue(value);
    }

    // Object {name: value}
    // Called by validator.validate
    // Called by form/fieldgroup collect
    getFieldValue(value?) {
        const { name, select, fgselect } = this.props;

        if (value === undefined || value === null) {
            value = this.getSubmitValue();
        }

        let object = { [name]: value };
        if (select) object = { [select]: object };
        if (fgselect) object = { [fgselect]: object };

        return Object.assign({}, object);
    }

    // Value from the Data Store
    // Used by display field
    static getFormattedValue(props) {
        const value = Field.getStoreValue(props);
        console.log(value);

        console.log("getFormattedValue");
        if (props.type) {
            return Field.formatValue(value, props.type, props.format);
        }
        return value;
    }

    static formatValue(value, type, format) {
        if (type) {
            switch (type) {
                case "Date":
                    return Field.dateToValue(
                        value,
                        format ? format : "MM/DD/YYYY"
                    );
                case "Time":
                    if (!format) {
                        format = "hh:mm:ss";
                    }
                    return Field.dateToValue(value, format, format);
                case "DateTime":
                    return Field.dateToValue(value, "MM/DD/YYYY hh:mm:ss A");
                case "Currency":
                    return NumberUtils.formatCurrency(value, 2, 3, ",", ".");
                case "Number":
                    return NumberUtils.format(value, 2, 3, ",", ".");
                default:
            }
        }
        return value;
    }

    static getStoreValueInFormat(props) {
        const { type } = props;
        const value = Field.getStoreValue(props);
        switch (type) {
            case "Date":
                return Field.dateToValue(
                    value,
                    props.format ? props.format : "MM/DD/YYYY"
                );
            default:
        }
        return value;
    }

    getValidationChildren() {
        const { required } = this.props;

        let childrenWithProps = React.Children.map(
            this.props.children,
            (child: any, index) => {
                let ref = child.ref;
                if (child.props.name) ref = child.props.name;
                if (!ref) ref = `validation--${index}`;
                return React.cloneElement(child, {
                    key: index,
                    ref,
                    field: this,
                });
            }
        );

        if (required) {
            if (!childrenWithProps) childrenWithProps = [];
            const valid = (e, field) => {
                return field.getInputValue().length != 0;
            };
            const ref = "validation--required";
            const props = {
                key: "required",
                name: required,
                message: "Required",
                valid,
                ref,
                field: this,
            };
            const requiredValidator: any = React.createElement(
                Validator,
                props
            );
            childrenWithProps.push(requiredValidator);
        }

        return childrenWithProps;
    }

    static dateToValue(date, format, inFormat?) {
        console.log(date);
        console.log("dateToValue");

        if (!date) return date;
        if (inFormat) {
            return moment(date, inFormat).local().format(format);
        } else {
            return moment(date).local().format(format);
        }
    }

    static getStoreValue(props, n = null) {
        if (!props) return "";

        const { model, select, multiple, fgselect, name, value } = props;

        let selector = model;

        if (value) return value; // need to ignore model if value is specified;
        if (model != null) {
            if (fgselect) {
                selector = selector[fgselect];
            } else if (select) {
                selector = selector[select];
            }

            if (multiple) {
                return selector;
            }

            if (selector) {
                if (name in selector) {
                    return selector[name];
                }
            }
            return "";
        }
        if (!value) return ""; // To prevent undefined in searchField
        return value;
    }

    /**
     *  selects value from impuut props like model.program.start and sets its value.
     */
    setStoreValue(value, props?) {
        if (!props) props = this.props;

        if (!props) return "";

        const { model, select, multiple, fgselect, name } = props;

        let selector = model;

        if (model != null) {
            if (fgselect) {
                selector = selector[fgselect];
            } else if (select) {
                selector = selector[select];
            }

            if (multiple) {
                selector = value;
            }

            if (selector) {
                selector[name] = value;
            }
        }
        return selector;
    }

    validate() {
        // required validation
        // const {required} = this.props;
        // if(required && !this.getInputValue()) return false;

        // Custom Validations
        let isValid = true;
        const keys = Object.keys(this.refs);

        for (const key of keys) {
            const validator: any = this.refs[key];
            if (validator.validate) {
                const valid = validator.validate();
                if (!valid) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }
}

export default Field;

/*
Cases:
Ex:Create Portfolio
    Render is called on rezize(or any prop update)
    A dirty field should not be changed.

Ex: Upload Editor
    REnder is called on resize(or any prop update)
    A dirty field should be changed (if apply is present).
    onBlur apply is called and dialog maintains state.


Ex: Rate
    Render is NOT CALLED on resize( due to its modal props)
    This is easy
 */
