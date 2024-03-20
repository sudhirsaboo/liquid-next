import React from "react";
import DateEntryField from "./DateEntryField";
import IconButton from "@/liquid-utils/button/IconButton";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class TimeEntryField extends DateEntryField {
    constructor(props) {
        super(props);
        this.state = {
            dateActive: false,
            format: this.props.format,
            icon: this.props.icon,
            type: this.props.type,
            value: TimeEntryField.getStoreValue(this.props), //hh mm a
            time: moment(
                TimeEntryField.getStoreValue(this.props),
                this.props.format
            ).toDate(), // js date
            valid: true,
            toggleCalendar: false,
        };
    }

    static defaultProps = {
        format: "hh:mm a",
        icon: "fa fa-clock-o",
        type: "DateTime",
    };
    getSubmitValue() {
        const { format } = this.state;

        const time = this.state.time; // This is in browser local
        if (!time) return null;
        return moment(time).format(format); // hh:mm a
    }
    static announceDateTime(time, format = "DD/MM/YYYY hh:mm a") {
        return moment(time).format(format);
    }
    onBlur() {
        super.onBlur();
    }

    handleTimeSelect = ({ value }) => {
        let timeStr; // hh mm a string
        let time = value; // javas date
        if (time instanceof Date) {
            timeStr = moment(time).format("HH:mm a");
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

    static mergeDateAndTime(
        start /*string in utc */,
        startTime /*string in utc  */,
        formatStart = null,
        formatStartTime = "hh:mm a"
    ) {
        const startDate = moment(start);
        const startDateTime = moment(startTime, formatStartTime);
        startDate.set({
            hour: startDateTime.get("hour"),
            minute: startDateTime.get("minute"),
            second: startDateTime.get("second"),
        });
        return startDate.utc().format();
    }
    static fillDateAndTime(name, post) {
        post[name + "Time"] = moment(post[name], "hh:mm a").format("hh:mm a");
        DateEntryField.fillDate(name, post);
    }

    calendar: any = React.createRef();

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
                            ref={this.calendar}
                            // active={this.state.dateActive}
                            className={this.props.className}
                            maxDate={this.props.maxDate}
                            minDate={this.props.minDate}
                            // onDismiss={this.handleDateDismiss}
                            onSelect={this.handleTimeSelect}
                            onBlur={this.onBlur.bind(this)}
                            onChange={this.handleTimeSelect}
                            value={this.state.time}
                            timeOnly
                            hourFormat="12"
                        />

                        <IconButton
                            icon={faTimes}
                            className={icon}
                            onClick={() => this.toggleCalendar()}
                        />
                    </div>

                    {this.getValidationChildren()}
                </div>
            </div>
        );
    }
}

export default TimeEntryField;
