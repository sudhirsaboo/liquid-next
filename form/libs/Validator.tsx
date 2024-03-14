/**
 * Created by ssaboo on 3/15/16.
 */
import * as React from "react";

class Validator extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { valid: true };
    }

    validate() {
        const { valid, field } = this.props;

        const pField = field;
        let value = null;
        if (pField && pField.getFieldValue) value = pField.getFieldValue();

        let isValid = true;
        if (valid) isValid = valid(value, pField);
        this.setState({ valid: isValid });
        field.setState({ valid: isValid });
        return isValid;
    }

    render() {
        const { message } = this.props;

        if (this.state.valid) {
            return null;
        }
        return (
            <div className="validation-error">
                <a href={`javascript:alert('${message}')`}>{message}</a>
            </div>
        );
    }
}

export default Validator;
