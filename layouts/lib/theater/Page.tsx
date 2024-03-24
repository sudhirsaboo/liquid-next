/**
 * Created by ssaboo on 2/29/16.
 */
/**
 * Created by ssaboo on 2/29/16.
 */
import React from "react";
import classnames from "classnames";

class Page extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const myClassNames = classnames(this.props.className, {
            "ui-page ": true,
        });

        return <div className={myClassNames}>{this.props.children}</div>;
    }
}

/*
Page.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
};
*/

export default Page;
