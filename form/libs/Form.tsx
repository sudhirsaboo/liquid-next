import * as React from "react";

import merge from "lodash/merge";

class Form extends React.Component<any, any> {
    render() {
        const { model, apply, replaceDirty } = this.props;
        const { post, error, className } = this.props;

        let childrenWithProps = null;
        if (model != null || apply != null) {
            childrenWithProps = React.Children.map(
                this.props.children,
                (child: any, index) => {
                    let ref = child.ref;
                    if (child.select) ref = child.select;
                    const name = child.type.name;
                    if (!ref) ref = `${name}--${index}`;

                    return React.cloneElement(child, {
                        ref: `${ref}`,
                        model,
                        apply,
                        replaceDirty,
                        form: this,
                    });
                }
            );
        } else {
            console.log("Possible Error: model and apply are both null.");
            childrenWithProps = this.props.children;
        }

        return (
            <form
                className={className}
                noValidate
                onSubmit={this.submit.bind(this)}
                action={post}
                method="POST"
            >
                {childrenWithProps}
                {error ? (
                    <div className="form-error-message">
                        {error.message ? error.message : error}
                    </div>
                ) : null}
            </form>
        );
    }

    collect(id) {
        if (!this.validate()) return false;

        const keys = Object.keys(this.refs);
        let data = {};
        for (const key of keys) {
            const fg: any = this.refs[key];
            let changes = {}; //
            if (fg.collect) {
                changes = fg.collect();
                data = merge({}, data, changes);
            }
        }
        return { form: merge({}, data, { id }) };
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
            const fg: any = this.refs[key];
            if (fg.clear) {
                fg.clear();
            }
        }
    }

    submit(event) {
        event.preventDefault();

        // this.reset_error()

        const { inputs } = this.props;

        if (inputs) {
            let focusOn;

            for (const input of inputs()) {
                if (!input.validate()) {
                    if (!focusOn) {
                        focusOn = input;
                    }
                }
            }

            if (focusOn) {
                return focusOn.focus({ preserveValidation: true });
            }
        }

        if (!this.props.action) {
            return;
        }

        this.props.action();
    }
}

export default Form;
