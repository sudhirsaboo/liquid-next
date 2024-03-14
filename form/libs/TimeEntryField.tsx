import * as React from "react";
import DateEntryField from "./DateEntryField";
import PickerDialog from "react-toolbox/lib/time_picker";
import IconButton from "@/liquid-utils/button/IconButton";
import * as moment from "moment";

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
        // const { value } = this.state;
        let timeStr;
        let valueDate = null;
        if (e instanceof Date) {
            valueDate = e; // date
            timeStr = moment(e).format("HH:mm a");
        } else if (e.target.value) {
            timeStr = e.target.value; // HH:mm a string
        }

        const dateStr = "1970-01-01";
        const newValue = moment(dateStr);
        const time = moment(timeStr, "hh:mm a");
        newValue.set({
            hour: time.get("hour"),
            minute: time.get("minute"),
            second: time.get("second"),
        });
        //  valueDate = newValue.toDate(); // date with time in date format
        // const value = date; // TimeEntryField.dateToValue(date, format, format);
        this.refs.input["value"] = timeStr;
        this.setState({ dateActive: false, value: timeStr }); // 1970 with time
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
                        <input
                            ref="input"
                            readOnly
                            className={"display-input"}
                            name={name}
                            value={this.state.value}
                            // defaultValue={this.state.value}
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
                                onSelect={this.handleTimeSelect}
                                onChange={this.handleTimeSelect}
                                value={this.valueToDate(this.state.value)}
                            />
                        }
                    </div>

                    {this.getValidationChildren()}
                </div>
            </div>
        );
    }
}

export default TimeEntryField;
