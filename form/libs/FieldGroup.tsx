import React from "react";

import merge from "lodash/merge";
import ExpandIcon from "@/liquid-utils/button/ExpandIcon";

class FieldGroup extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    state = {
        collapsed: this.props.collapsed,
    };

    static defaultProps = {
        collapsed: false,
        collapsible: true,
    };

    onChange = () => {};

    toggleCollpase = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    collect() {
        const keys = Object.keys(this.refs);
        let data = {};
        for (const key of keys) {
            const field: any = this.refs[key];
            let changes = {}; //
            if (field.collect) {
                changes = field.collect();
                data = merge({}, data, changes);
            }
        }
        return data;
    }

    validate() {
        const keys = Object.keys(this.refs);
        let isValid = true;

        for (const key of keys) {
            const validator: any = this.refs[key];
            if (validator.validate) {
                const valid = validator.validate();
                if (!valid) isValid = false;
            }
        }
        return isValid;
    }

    clear() {
        const keys = Object.keys(this.refs);
        for (const key of keys) {
            const field: any = this.refs[key];
            if (field.clear) {
                field.clear();
            }
        }
    }

    renderHeader() {
        const { label } = this.props;
        const { collapsed } = this.state;

        if (!label) return null;
        return (
            <div className="field-group-header">
                <a onClick={this.toggleCollpase}>
                    <ExpandIcon collapsed={this.state.collapsed}></ExpandIcon>

                    {label}
                </a>
            </div>
        );
    }

    render() {
        const { model, apply, select, replaceDirty } = this.props;
        const { collapsed } = this.state;

        // Add model property to each child. // React make us clone even to add new property
        let childrenWithProps = null;
        if (!collapsed) {
            if (model != null) {
                childrenWithProps = React.Children.map(
                    this.props.children,
                    (child: any, index) => {
                        let ref = child.ref;
                        if (child.props.name)
                            ref = child.props.select + child.props.name; // TODO make sure they are unique
                        if (!ref) ref = `field--${index}`;

                        return React.cloneElement(child, {
                            ref,
                            fgselect: select,
                            model,
                            apply,
                            replaceDirty,
                            fieldGroup: this,
                        });
                        // return React.cloneElement(child, {model: model, apply:apply});
                    }
                );
            } else {
                childrenWithProps = this.props.children;
            }
        }
        return (
            <div className="ui-field-group">
                {this.renderHeader()}
                <div className="field-group-content">{childrenWithProps}</div>
            </div>
        );
    }
}

export default FieldGroup;
// can use keypath .https://www.npmjs.com/package/key-path
