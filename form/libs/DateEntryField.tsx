import * as React from "react";
import EntryField from "./EntryField";
import { Calendar } from "primereact/calendar";
import IconButton from "@/liquid-utils/button/IconButton";
import moment from "moment";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

class DateEntryField extends EntryField {
    constructor(props) {
        super(props);
    }

    state = {
        dateActive: false,
        format: this.props.format,
        icon: this.props.icon,
        value: DateEntryField.getStoreValueChecked(this.props),
        date: DateEntryField.valueToDate(
            DateEntryField.getStoreValueChecked(this.props),
            this.props.format
        ),
        valid: true,
        calendarToggle: false,
    };

    static defaultProps = {
        format: "MM/DD/YYYY",
        icon: "fa fa-calendar",
        type: "Date",
    };

    onBlur() {
        super.onBlur();
    }

    static fillDate(name, post) {
        post[name + "Date"] = moment(post[name]).format("MM/DD/YYYY");
    }
    getSubmitValue() {
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

    onChange = (e) => {
        const { format } = this.state;
        const date = e.value;
        const value = DateEntryField.dateToValue(date, format, format);
        // this.refs.input["value"] = value;
        this.setState({ ...this.state, date, value }); // js date
        this.setStoreValue(value); // formatted string date
    };

    toggleCalendar() {
        if (this.state.toggleCalendar) {
            this.setState({ ...this.state, toggleCalendar: false });
            this.calendar.current.hide();
        } else {
            this.setState({ ...this.state, toggleCalendar: true });
            this.calendar.current.show();
        }
    }
    getValue() {
        const { format } = this.state;

        const value = super.getValue();
        if (value) {
            return moment(value).format(format);
        }
        return null;
    }
    calendar: any = React.createRef();

    render() {
        const { name, label, required } = this.props;
        const { icon } = this.state;

        return (
            <div className="input-container">
                <label data-name={name}>{label}</label>

                <div className="md-input">
                    <Calendar
                        ref={this.calendar}
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
