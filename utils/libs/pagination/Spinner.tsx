import React from "react";

class Spinner extends React.Component<any, any> {
    render() {
        return (
            <div style={this.props.style} className="spinner-container">
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>
        );
    }
}

export default Spinner;
