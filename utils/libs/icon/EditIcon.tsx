import * as React from "react";

import { changeModal } from "../../../../actions/modal";
import IconButton from "../button/IconButton";
import Auth from "../others/Auth";

class EditIcon extends React.Component<any, any> {
    dismiss = () => {
        const { dispatch } = this.props;
        dispatch(changeModal(null));
    };

    edit = () => {
        const { dispatch, Editor, onClick } = this.props;
        if (Editor) {
            dispatch(changeModal("modal", this.props, Editor));
        } else if (onClick) {
            onClick();
        }
    };

    render() {
        return (
            <IconButton
                className="fa-wrench fa"
                onClick={this.edit}
                tooltip="Edit"
            />
        );
    }
}

const EditIconWA = Auth(EditIcon, false);
export default EditIconWA;

const EditIconWOA = EditIcon;

export { EditIconWOA };
