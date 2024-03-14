import * as React from "react";
import Field from "../Field";
import Chip from "react-toolbox/lib/chip";
import * as PropTypes from "prop-types"; // ES6

class TagsField extends Field {
    constructor(props) {
        super(props);
    }

    renderTag(props) {
        const { tag, key, ...other } = props;
        return (
            <Chip key={key} {...other}>
                {tag}
            </Chip>
        );
    }
    render() {
        // eslint-disable-next-line
        let { value, label, tagProps, ...other } = this.props;
        if (!value) value = [];
        const dummy = null;
        const tagComponents = value.map((tag, index) => {
            return this.renderTag({ key: index, tag, dummy, ...tagProps });
        });

        return (
            <div className="display-field md-input-container">
                <label data-name={name}>{label}</label>

                <div ref="div">
                    <span>{tagComponents}</span>
                </div>
            </div>
        );
    }
    static propTypes = {
        tagProps: PropTypes.object,
        value: PropTypes.array
    };
    static defaultProps = {
        className: "react-tagsinputx",
        tagProps: {
            className: "react-tagsinput-tagx",
            classNameRemove: "react-tagsinput-removex"
        }
    };
}
// eslint-disable-next-line
function defaultRenderTag(props) {
    // eslint-disable-next-line
    const { tag, key, onRemove, classNameRemove, ...other } = props;
    return (
        <span key={key} {...other}>
            {tag}
        </span>
    );
}

/*stapropTypes = {
    key: React.PropTypes.number,
    tag: React.PropTypes.string,
    onRemove: React.PropTypes.function,
    classNameRemove: React.PropTypes.string,
};*/

export default TagsField;
