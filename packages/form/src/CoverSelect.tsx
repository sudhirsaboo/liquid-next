import React from "react";
import classnames from "classnames";
import Dropzone from "./DropZone";
import ProgressBar from "./ProgressBar";
import IconButton from "@liquid101/util/button/IconButton";

import PropTypes from "prop-types"; // ES6

class CoverSelect extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    renderCover() {
        const { post, cover, onRemove } = this.props;

        if (!cover) return null;
        let url = cover.url;
        if (cover.getUrl) {
            url = cover.getUrl();
        }

        const rootClassName = classnames("drop-thumb", {
            "drop-thumb-selected": post.selected,
        });

        return (
            <div key={`cover-${cover.id}`} className={rootClassName}>
                <span className="center-image" />

                <img src={url} />

                {cover.file ? (
                    <ProgressBar
                        className="progress-striped active"
                        value={cover.progress}
                        type={cover.type}
                        displayCondition={cover.progress < 100 || cover.error}
                    ></ProgressBar>
                ) : null}

                {onRemove ? (
                    <IconButton
                        title="Remove"
                        className="content-remove fa fa-eraser"
                        onClick={onRemove}
                    ></IconButton>
                ) : null}
            </div>
        );
    }

    render() {
        const { type, onSelect, ...other } = this.props;

        const rootClassName = classnames("dropbox-grid-cover", {
            "avatar large centered": type === "avatar",
        });

        return (
            <div className={rootClassName}>
                <Dropzone
                    className="drop-box-cover"
                    title="Change"
                    ref="dropzone"
                    accept="image/*"
                    onDrop={onSelect}
                    {...other}
                >
                    <IconButton className="fa fa-paint-brush" />
                </Dropzone>
                {this.renderCover()}
            </div>
        );
    }

    static propTypes = {
        post: PropTypes.object,
        cover: PropTypes.object,
        onSelect: PropTypes.func,
        onRemove: PropTypes.func,
    };
}

export default CoverSelect;
