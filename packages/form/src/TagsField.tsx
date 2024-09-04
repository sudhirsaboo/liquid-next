import React from "react";
import { Chips } from "primereact/chips";

import Field from "./Field";

class TagsField extends Field {
    getInputValue() {
        throw new Error("Method not implemented.");
    }
    static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps === nextProps) {
            return null;
        }

        let value = TagsField.getStoreValue(nextProps);
        if (value === null) value = "";
        return { prevProps: nextProps, value };
    }

    input: any;
    constructor(props) {
        super(props);
        this.state = { tags: Field.getStoreValue(this.props) };
    }

    handleChange(e) {
        const tags = e.value;
        if (!this.props.apply) {
            this.setStoreValue(tags);
        }
        this.setState({ tags: [...tags] });
    }

    getSubmitValue() {
        return this.state.tags;
    }
    render() {
        let {
            value,
            name,
            label,
            onChange,
            fgselect,
            model,
            apply,
            replaceDirty,
            ...other
        } = this.props;

        const { tags } = this.state;

        return (
            <div className="input-container">
                <label data-name={name}>{label}</label>
                <Chips
                    value={this.state.tags}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}

export default TagsField;
