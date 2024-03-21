import * as React from "react";
import Field from "./Field";

class HiddenField extends Field {
    getInputValue() {
        throw new Error("Method not implemented.");
    }

    constructor(props) {
        super(props);
    }

    state = {
        value: HiddenField.getStoreValueChecked(this.props),
        valid: true,
    };

    isEditable() {
        return false;
    }
    input: any = React.createRef();

    render() {
        const { name } = this.props;

        return (
            <input
                ref={this.input}
                type="hidden"
                name={name}
                value={this.state.value}
            />
        );
    }
}

export default HiddenField;
