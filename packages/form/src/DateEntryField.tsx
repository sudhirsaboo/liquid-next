import React from "react";
import Field from "./Field";
import { Calendar } from "primereact/calendar";
import IconButton from "liquid-util/button/IconButton";
import moment from "moment";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

class DateEntryField extends Field {
    constructor(props) {
        super(props);
    }
    input: any = React.createRef();

    state = {
        dateActive: false,
        format: this.props.format,
        icon: this.props.icon,
        value: DateEntryField.getStoreValueInFormat(this.props), // DD/MM/YYYY
        date: DateEntryField.valueToDate(
            DateEntryField.getStoreValueInFormat(this.props),
            this.props.format
        ),
        valid: true,
    };

    static defaultProps = {
        format: "MM/DD/YYYY",
        icon: "fa fa-calendar",
        type: "Date",
    };

    onBlur() {
        super.onBlur();
    }

    getInputValue() {
        return this.state.value;
    }

    static fillDate(name, post) {
        post[name + "Date"] = moment(post[name]).format("MM/DD/YYYY");
    }

    getSubmitValue(): null | string {
        const { format } = this.state;

        const dateStr = this.state.value; // This is in browser local
        if (!dateStr) return null;
        return moment(dateStr, format).utc().format(); // need in utc yyyy-mm-dd
    }

    // mm/dd/yyyy to date
    static valueToDate(value, format) {
        if (!value) return new Date();
        return moment(value, format).toDate();
    }

    static announceDate(time, format = "DD/MM/YYYY") {
        return moment(time).format(format);
    }

    onChange = (e) => {
        const { format } = this.state;
        const date = e.value;
        const value = DateEntryField.dateToValue(date, format, format);
        this.setState({ ...this.state, date, value }); // js date
        this.setStoreValue(value); // formatted string date
    };

    toggleCalendar() {
        if (this.input.current.getOverlay()) {
            this.input.current.hide();
        } else {
            this.input.current.show();
        }
    }

    //@ts-ignore
    getValue(props?) {
        const { format } = this.state;

        const value = super.getValue(null);
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
                        ref={this.input}
                        className={"display-input"}
                        name={name}
                        required={required}
                        value={this.state.date}
                        onChange={this.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                    />
                    <IconButton
                        icon={faCalendar}
                        className={icon}
                        onClick={() => this.toggleCalendar()}
                    />
                </div>

                {this.getValidationChildren()}
            </div>
        );
    }
}

export default DateEntryField;
