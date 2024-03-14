import * as React from "react";
import { Chips } from "primereact/chips";

import Field from "./Field";

class TagsField extends Field {
    constructor(props) {
        super(props);
        this.state = { tags: [] };
    }

    handleChange(e) {
        const { onChange } = this.props.inputProps;
        const tags = e.value;

        if (onChange) {
            onChange(e);
        }

        this.setState({ tags: [...tags] });
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
            <div className=" md-input-container">
                <label data-name={name}>{label}</label>
                <Chips
                    value={this.state.tags}
                    onChange={this.handleChange.bind(this)}
                    disabled
                />
            </div>
        );
    }
}

export default TagsField;
