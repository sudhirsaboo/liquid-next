import React from "react";
import Field from "./Field";
import { InputText } from "primereact/inputtext";
import keycode from "keycode";

class SearchField extends Field {
    getInputValue() {
        throw new Error("Method not implemented.");
    }
    constructor(props) {
        super(props);
    }

    onKeyPress = (e) => {
        if (this.props.onKeyPress) this.props.onKeyPress(e);
        if (keycode(e) != "enter") {
            return;
        }
        this.props.applyFilter(e);
    };

    onChange = () => {
        this.input.current.dirty = true;
    };
    input: any = React.createRef();

    render() {
        const { placeholder, label, ...other } = this.props;

        const value = SearchField.getStoreValue(this.props);

        return (
            // @ts-ignore
            <div>
                <label htmlFor={placeholder}>{label}</label>

                <InputText
                    ref={this.input}
                    defaultValue={value}
                    {...other}
                    disabled={!this.isEditable()}
                    onChange={this.onChange}
                    onBlur={this.onBlur.bind(this)}
                    onKeyPress={this.onKeyPress}
                />
            </div>
        );
    }
}

export default SearchField;
