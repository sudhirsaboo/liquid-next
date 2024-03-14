import * as React from "react";

class ValidationArea extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {} = this.props;

        if (this.props.children) {
            return (
                <div className="instruction_area">{this.props.children}</div>
            );
        }

        return null;
    }
}

export default ValidationArea;
