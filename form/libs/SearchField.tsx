import * as React from "react";
import Field from "./Field";
import Input from "react-toolbox/lib/input";
import * as keycode from "keycode";

class SearchField extends Field {
    constructor(props) {
        super(props);
    }

    onKeyPress = e => {
        if (this.props.onKeyPress) this.props.onKeyPress(e);
        if (keycode(e) != "enter") {
            return;
        }
        this.props.applyFilter(e);
    };

    onChange = () => {
        this.refs.input["dirty"] = true;
    };

    render() {
        const { placeholder, ...other } = this.props;

        const value = SearchField.getStoreValue(this.props);

        return (
            // @ts-ignore
            <Input
                ref="input"
                hint=""
                label={placeholder}
                // @ts-ignore
                defaultValue={value}
                {...other}
                disabled={!this.isEditable()}
                onChange={this.onChange}
                onBlur={this.onBlur.bind(this)}
                onKeyPress={this.onKeyPress}
            />
        );
    }
}

export default SearchField;
