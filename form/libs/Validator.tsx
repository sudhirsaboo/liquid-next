/**
 * Created by ssaboo on 3/15/16.
 */
import React from "react";

class Validator extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { valid: true };
    }

    validate() {
        const { valid, field, model } = this.props;

        let value = field?.getFieldValue();
        let isValid = valid ? valid(value, field, this.props) : true;
        this.setState({ valid: isValid });
        field?.setState({ valid: isValid });
        return isValid;
    }

    render() {
        const { message } = this.props;

        if (this.state.valid) {
            return null;
        }
        return (
            <div className="validation-error">
                <a href="#">{message}</a>
            </div>
        );
    }
}

export default Validator;
