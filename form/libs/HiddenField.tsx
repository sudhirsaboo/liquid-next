import * as React from "react";
import Field from "./Field";

class HiddenField extends Field {
    constructor(props) {
        super(props);
    }

    state = {
        value: HiddenField.getStoreValueChecked(this.props),
        valid: true
    };

    isEditable() {
        return false;
    }

    render() {
        const { name } = this.props;

        return (
            <input
                ref="input"
                type="hidden"
                name={name}
                value={this.state.value}
            />
        );
    }
}

export default HiddenField;
