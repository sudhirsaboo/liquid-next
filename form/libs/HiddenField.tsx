import * as React from "react";
import Field from "./Field";

class HiddenField extends Field {
    constructor(props) {
        super(props);
    }

    state = {
        value: HiddenField.getStoreValueInFormat(this.props),
        valid: true,
    };

    isEditable() {
        return false;
    }
    getInputValue() {
        return this.state.value;
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
