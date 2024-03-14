import * as React from "react";

class Header extends React.Component<any, any> {
    constructor(args) {
        super(args);
    }

    render() {
        return (
            <div className="flex-container overlay top  ">
                {this.props.children}
            </div>
        );
    }
}

export default Header;
