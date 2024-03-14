import * as React from "react";
import * as moment from "moment";
import Validator from "./Validator";

import NumberUtils from "@/liquid-utils/NumberUtils";
class Field extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { valid: true };
  }

  /* (nextProps) {
        if (this.refs.input) {
            const value = Field.getStoreValueChecked(nextProps);

            let replace = true;
            if (this.props.apply) {
                replace = true;
            } else if (this.refs.input["dirty"]) {
                replace = false;
            }

            if (replace) {
                this.refs.input["value"] = value;
                if (this.refs.input["setValue"])
                    this.refs.input["setValue"](value);
            } else {
                //  if(this.refs.input.dirty)
                // console.log(this.replaceUndef(nextProps.label) + this.replaceUndef( nextProps.placeholder )+  "dirty hence not changing");
                // else if(!value)
                // console.log( this.replaceUndef(nextProps.label) +  this.replaceUndef(nextProps.placeholder) + " empty hence not changing ");
            }
        }
    } */

  toBoolean(value) {
    if (value === "true" || value === true) {
      return true;
    }
    return false;
  }

  isEditable() {
    if (this.props.editable === "false" || this.props.editable === false) {
      return false;
    }
    return true;
  }

  clear() {
    if (this.refs.input) {
      if (this.refs.input["setValue"]) this.refs.input["setValue"]("");
      this.refs.input["value"] = "";
    }
    if (this["setValue"]) {
      this["setValue"]("");
    }
  }

  onApply(value?) {
    if (this.props.apply) {
      const object = this.getFieldValue(value);
      this.props.apply(Object.assign({}, object));
    }
  }
  // eslint-disable-next-line
  onChange = (e?, b?, c?) => {
    if (this.refs.input) {
      this.refs.input["dirty"] = true;
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
  // eslint-disable-next-line
  getValue(props?) {
    return this.getFieldValue();
  }

  getInputValue() {
    const { multiple } = this.props;
    let value = null;

    if (multiple) {
      value = [];
      const selections = this.refs.input["selectedOptions"];
      for (let i = 0; i < selections.length; i++) {
        value.push(selections[i].value);
      }
      return value;
    }

    if (this.refs.input) {
      if (this.refs.input["getValue"]) {
        value = this.refs.input["getValue"]();
      } else {
        value = this.refs.input["value"];
      }
    }
    return value;
  }

  getSubmitValue() {
    return this.getInputValue();
  }

  // Object {name: value}
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

  collect(value) {
    return this.getFieldValue(value);
  }

  // Value from the Data Store
  // can use if needed https://www.npmjs.com/package/key-path
  static getFormattedValue(props) {
    const value = Field.getStoreValue(props);

    if (props.type) {
      return Field.formatValue(value, props.type);
    }
    return value;
  }

  static formatValue(value, type) {
    if (type) {
      switch (type) {
        case "Date":
          return this.dateToValue(value, "MM/DD/YYYY");
        case "DateTime":
          return this.dateToValue(value, "MM/DD/YYYY hh:mm:ss A");
        case "Currency":
          return NumberUtils.formatCurrency(value, 2, 3, ",", ".");
        case "Number":
          return NumberUtils.format(value, 2, 3, ",", ".");
        default:
      }
    }
    return value;
  }

  static getStoreValueChecked(props) {
    const { type } = props;
    const value = Field.getStoreValue(props);
    // These are just check to ensure no time is preset in Date field
    switch (type) {
      case "Date":
        return Field.dateToValue(value, "MM/DD/YYYY"); // on resize program dates were getting wrong format
      case "DateTime": {
        const format = props.format ? props.format : "hh:mm:ss";
        return Field.dateToValue(value, format);
      }
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
      const requiredValidator: any = React.createElement(Validator, props);
      childrenWithProps.push(requiredValidator);
    }

    return childrenWithProps;
  }

  static dateToValue(date, format, inFormat?) {
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
      }
      if (select) {
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

  setStoreValue(value, props?) {
    if (!props) props = this.props;

    if (!props) return "";

    const { model, select, multiple, fgselect, name } = props;

    let selector = model;

    if (model != null) {
      if (fgselect) {
        selector = selector[fgselect];
      }
      if (select) {
        selector = selector[select];
      }

      if (multiple) {
        selector = value;
      }

      if (selector) {
        if (name in selector) {
          selector[name] = value;
        } else {
          selector[name] = value;
        }
      }
    }
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

  replaceUndef(input) {
    if (!input) return "";

    return input;
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
