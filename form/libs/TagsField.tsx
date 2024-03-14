// https://github.com/olahol/react-tagsinput

import * as React from "react";
import Chip from "react-toolbox/lib/chip";

import Field from "./Field";

function defaultRenderTag(props) {
    // eslint-disable-next-line
    const { tag, key, onRemove, ...other } = props;
    return (
        <Chip
            deletable
            onDeleteClick={() => onRemove(key)}
            key={key}
            {...other}
        >
            {tag}
        </Chip>
    );
}

function defaultRenderInput(props) {
    // eslint-disable-next-line
    const { onChange, value, ...other } = props;
    return <input type="text" onChange={onChange} value={value} {...other} />;
}

function defaultRenderLayout(tagComponents, inputComponent) {
    return (
        <span>
            {tagComponents}
            {inputComponent}
        </span>
    );
}

class TagsField extends Field {
    constructor(props) {
        super(props);
        this.state = { tag: "" };
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
    }

    _removeTag(index) {
        const value = this.props.value.concat([]);
        if (index > -1 && index < value.length) {
            value.splice(index, 1);
            // //this.props.onChange(value)
            super.onApply(value);
        }
    }

    _clearInput() {
        this.setState({ tag: "" });
    }

    _maxTags(tags) {
        return this.props.maxTags !== -1 ? tags < this.props.maxTags : true;
    }

    _addTag(tag) {
        const { onlyUnique } = this.props;
        let value = this.props.value;
        if (!value) value = [];
        const isUnique = value.indexOf(tag) === -1;
        const limit = this._maxTags(value.length);
        if (tag !== "" && limit && (isUnique || !onlyUnique)) {
            // //this.props.onChange(value)
            super.onApply(value.concat([tag]));
            this._clearInput();
        }
    }

    focus() {
        this.refs.input["focus"]();
    }

    blur() {
        this.refs.input["focus"]();
    }

    handleKeyDown(e) {
        const { value, removeKeys, addKeys, validationRegex } = this.props;
        const { tag } = this.state;
        const empty = tag === "";
        const add = addKeys.indexOf(e.keyCode) !== -1;
        const remove = removeKeys.indexOf(e.keyCode) !== -1;

        if (add) {
            // e.preventDefault()
            if (validationRegex.test(tag)) {
                this._addTag(tag);
            }
        }

        if (remove && value.length > 0 && empty) {
            // e.preventDefault()
            //this._removeTag(value.length - 1);
        }
    }

    handleClick(e) {
        if (e.target === this.refs.div) {
            this.focus();
        }
    }

    handleChange(e) {
        const { onChange } = this.props.inputProps;
        const tag = e.target.value;

        if (onChange) {
            onChange(e);
        }

        this.setState({ tag });
    }

    handleOnBlur(e) {
        this._addTag(e.target.value);
    }

    handleRemove(tag) {
        this._removeTag(tag);
    }

    inputProps() {
        const { ...otherInputProps } = this.props.inputProps;
        return otherInputProps;
    }

    render() {
        /* eslint-disable */
        let {
            value,
            label,
            onChange,
            inputProps,
            tagProps,
            renderLayout,
            renderTag,
            renderInput,
            addKeys,
            removeKeys,
            onlyUnique,
            maxTags,
            validationRegex,
            fgselect,
            model,
            apply,
            replaceDirty,
            ...other
        } = this.props;
        /* eslint-enable */

        const { tag } = this.state;

        if (!value) value = [];
        const tagComponents = value.map((tag, index) => {
            return renderTag({
                key: index,
                tag,
                onRemove: this.handleRemove.bind(this),
                ...tagProps
            });
        });

        const props = this.inputProps();
        const inputComponent = renderInput({
            ref: "input",
            value: tag,
            onKeyDown: this.handleKeyDown.bind(this),
            onChange: this.handleChange.bind(this),
            onBlur: this.handleOnBlur.bind(this),
            ...props
        });

        return (
            <div className=" md-input-container">
                <label data-name={name}>{label}</label>

                <div ref="div" onClick={this.handleClick.bind(this)} {...other}>
                    {renderLayout(tagComponents, inputComponent)}
                </div>
            </div>
        );
    }

    static defaultProps = {
        className: "react-tagsinput",
        addKeys: [9, 13],
        inputProps: { className: "react-tagsinput-input" },
        removeKeys: [8],
        renderInput: defaultRenderInput,
        renderTag: defaultRenderTag,
        renderLayout: defaultRenderLayout,
        tagProps: {},
        onlyUnique: false,
        maxTags: -1,
        validationRegex: /.*/
    };
}

export default TagsField;
