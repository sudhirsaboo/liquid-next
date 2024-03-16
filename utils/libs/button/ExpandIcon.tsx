import React from "react";

import IconButton from "../button/IconButton";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

class ExpandIcon extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.collapsed ? (
                    <IconButton
                        label="Expand"
                        icon={faChevronDown}
                    ></IconButton>
                ) : (
                    <IconButton
                        label="Collapse"
                        icon={faChevronUp}
                    ></IconButton>
                )}
            </>
        );
    }
}

// const EditIconWA = Auth(EditIcon, false);
// export default EditIconWA;

// const EditIconWOA = EditIcon;

export default ExpandIcon;
