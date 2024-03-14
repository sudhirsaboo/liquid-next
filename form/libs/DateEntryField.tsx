import * as React from "react";
import EntryField from "./EntryField";
import { Calendar } from "primereact/calendar";
import IconButton from "@/liquid-utils/button/IconButton";
import * as moment from "moment";

class DateEntryField extends EntryField {
    constructor(props) {
        super(props);
    }

    state = {
        dateActive: false,
        format: this.props.format,
        icon: this.props.icon,
        value: DateEntryField.getStoreValueChecked(this.props),
        date: null,
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

    onChange = (e) => {
        //parent has some logic.
        const { format } = this.state;
        const date = e.value;
        const value = DateEntryField.dateToValue(date, format, format);
        // this.refs.input["value"] = value;
        this.setState({ date }); // js date
        this.setStoreValue(value); // formatted string date
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
                    <Calendar
                        //ref="input"
                        className={"display-input"}
                        name={name}
                        required={required}
                        value={this.state.date}
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                    />
                    <IconButton
                        className={icon}
                        onClick={this.handleInputMouseDown}
                    />
                </div>

                {this.getValidationChildren()}
            </div>
        );
    }
}

export default DateEntryField;
