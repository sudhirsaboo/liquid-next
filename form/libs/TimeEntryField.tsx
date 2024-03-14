import * as React from "react";
import DateEntryField from "./DateEntryField";
import IconButton from "@/liquid-utils/button/IconButton";
import * as moment from "moment";
import { Calendar } from "primereact/calendar";

class TimeEntryField extends DateEntryField {
    constructor(props) {
        super(props);
    }

    state = {
        dateActive: false,
        format: this.props.format,
        icon: this.props.icon,
        type: this.props.type,
        //value: null,
        value: TimeEntryField.getStoreValueChecked(this.props),
        time: null,
        valid: true,
    };

    static defaultProps = {
        format: "hh:mm a",
        icon: "fa fa-clock-o",
        type: "DateTime",
    };
    getSubmitValue() {
        const { format } = this.state;

        const res = this.getInputValue(); // This is in browser local
        if (!res) return null;
        return moment(res, format).format(); // need in utc yyyy-mm-dd
    }
    onBlur() {
        /* this.refs.calendar.updateCalendar(
            this.valueToDate(this.getInputValue())
        ); */
        //  super.onBlur();
    }

    handleTimeSelect = (e) => {
        let timeStr;
        let valueDate = null;
        let time = e.value;
        if (time instanceof Date) {
            valueDate = e; // date
            timeStr = moment(e).format("HH:mm a");
        } else if (time) {
            timeStr = time; // HH:mm a string
        }

        const dateStr = "1970-01-01";
        const newValue = moment(dateStr);
        const time2 = moment(timeStr, "hh:mm a");
        newValue.set({
            hour: time2.get("hour"),
            minute: time2.get("minute"),
            second: time2.get("second"),
        });
        this.setState({ dateActive: false, value: timeStr, time: time }); // 1970 with time
        this.setStoreValue(timeStr); // or timeStr
    };

    static mergeDateAndTime(start, startTime) {
        const startDate = moment(start);
        const startDateTime = moment(startTime);
        startDate.set({
            hour: startDateTime.get("hour"),
            minute: startDateTime.get("minute"),
            second: startDateTime.get("second"),
        });
        return startDate.utc().format();
    }
    render() {
        const { name, label } = this.props;

        const { icon } = this.state;

        return (
            <div>
                <div className="md-input-container">
                    <label data-name={name}>{label}</label>

                    <div className="md-input">
                        {/* <Calendar
                            ref="input"
                            readOnly
                            className={"display-input"}
                            name={name}
                            value={this.state.value}
                            // defaultValue={this.state.value}
                            onChange={this.onChange.bind(this)}
                            onBlur={this.onBlur.bind(this)}
                        /> */}

                        <Calendar
                            ref="picker"
                            // active={this.state.dateActive}
                            className={this.props.className}
                            maxDate={this.props.maxDate}
                            minDate={this.props.minDate}
                            // onDismiss={this.handleDateDismiss}
                            onSelect={this.handleTimeSelect}
                            onChange={this.handleTimeSelect}
                            value={this.state.time}
                            timeOnly
                        />

                        <IconButton
                            className={icon}
                            onClick={this.handleInputMouseDown}
                        />
                    </div>

                    {this.getValidationChildren()}
                </div>
            </div>
        );
    }
}

export default TimeEntryField;
