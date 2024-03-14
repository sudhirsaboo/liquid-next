import * as React from "react";

import { changeModal } from "../../../../actions/modal";
import IconButton from "../button/IconButton";
import Auth from "../others/Auth";

import DeleteCard from "./DeleteCard";

class DeleteIcon extends React.Component<any, any> {
    onDelete = () => {
        const { dispatch } = this.props;
        /* if(onClick){
            onClick();
        }
        else*/
        dispatch(changeModal("modal", this.props, DeleteCard));
    };

    render() {
        if (!this.props.store) {
            return <div />;
        }
        return (
            <IconButton
                className="font-icon fa-close fa"
                tooltip="Delete"
                onClick={this.onDelete}
            />
        );
    }
}

const DeleteIconWA = Auth(DeleteIcon, false);
const DeleteIconWOA = DeleteIcon;

export default DeleteIconWA;
export { DeleteIconWOA };
