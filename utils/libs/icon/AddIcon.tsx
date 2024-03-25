import React from "react";

//import { changeModal } from "../../../../actions/modal";
import IconButton from "../button/IconButton";

class AddIcon extends React.Component<any, any> {
    dismiss = () => {
        const { dispatch } = this.props;
        // dispatch(changeModal(null));
    };

    add = () => {
        const { dispatch, Editor, onClick } = this.props;
        if (Editor) {
            //dispatch(changeModal("modal", this.props, Editor));
        } else if (onClick) {
            onClick();
        }
    };

    render() {
        return (
            <IconButton icon="fa-plus" onClick={this.add} tooltip="Add New" />
        );
    }
}

export default AddIcon;
