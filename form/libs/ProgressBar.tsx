import React from "react";

class ProgressBar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        let completed = +this.props.value;
        if (completed < 0) {
            completed = 0;
        }
        if (completed > 100) {
            completed = 100;
        }

        const style = {
            backgroundColor: this.props.color || "#0BD318",
            width: completed + "%",
            transition: "width 200ms",
            height: this.props.height || 10,
        };

        return (
            <div className="progressbar-container">
                <div className="progressbar-progress" style={style}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ProgressBar;
