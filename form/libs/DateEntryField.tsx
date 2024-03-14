import * as React from "react";
import EntryField from "./EntryField";
import PickerDialog from "react-toolbox/lib/date_picker";
import IconButton from "@/liquid-utils/button/IconButton";
import * as moment from "moment";
import Input from "react-toolbox/lib/input";

class DateEntryField extends EntryField {
    constructor(props) {
        super(props);
    }

    state = {
        dateActive: false,
        format: this.props.format,
        icon: this.props.icon,
        value: DateEntryField.getStoreValueChecked(this.props),
        valid: true,
    };

    static defaultProps = {
        format: "MM/DD/YYYY",
        icon: "fa fa-calendar",
        type: "Date",
    };

    onBlur() {
        if (this.refs.picker && this.refs.picker["update"])
            this.refs.picker["update"](this.valueToDate(this.getInputValue()));
        super.onBlur();
    }

    getSubmitValue() {
        const { format } = this.state;

        const res = this.getInputValue(); // This is in browser local
        if (!res) return null;
        return moment(res, format).utc().format(); // need in utc yyyy-mm-dd
    }

    // mm/dd/yyyy to date
    valueToDate(value) {
        const { format } = this.state;

        if (!value) return new Date();
        return moment(value, format).toDate();
    }

    handleDateSelect = (date) => {
        const { format } = this.state;
        const value = DateEntryField.dateToValue(date, format, format);
        this.refs.input["value"] = value;
        this.setState({ dateActive: false, value });
        this.setStoreValue(value);
    };

    handleDateDismiss = () => {
        this.setState({ dateActive: false });
    };

    handleInputMouseDown = () => {
        this.setState({ dateActive: true });
    };

    getValue() {
        const { format } = this.state;

        const value = super.getValue();
        if (value) {
            return moment(value).format(format);
        }
        return null;
    }

    render() {
        const { name, label, required } = this.props;
        const { icon } = this.state;

        return (
            <div className="input-container">
                <label data-name={name}>{label}</label>

                <div className="md-input">
                    <Input
                        ref="input"
                        label={label}
                        className={"display-input"}
                        name={name}
                        required={required}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                    />
                    <IconButton
                        className={icon}
                        onClick={this.handleInputMouseDown}
                    />

                    {
                        <PickerDialog
                            ref="picker"
                            autoOk={this.props.autoOk}
                            active={this.state.dateActive}
                            className={this.props.className}
                            maxDate={this.props.maxDate}
                            minDate={this.props.minDate}
                            onDismiss={this.handleDateDismiss}
                            onChange={this.handleDateSelect}
                            value={this.valueToDate(this.state.value)}
                        />
                    }
                </div>

                {this.getValidationChildren()}
            </div>
        );
    }
}

export default DateEntryField;
