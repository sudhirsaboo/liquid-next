import React from "react";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@liquid101/util/button/IconButton";
import Field from "./Field";
import DateEntryField from "./DateEntryField";

class TimeEntryField extends Field {
    constructor(props) {
        super(props);
    }
    state = {
        format: this.props.format,
        icon: this.props.icon,
        type: this.props.type,
        value: TimeEntryField.getStoreValue(this.props), //hh:mm a
        time: moment(
            TimeEntryField.getStoreValue(this.props),
            this.props.format
        ).toDate(), // js date
        valid: true,
    };
    toggleCalendar() {
        if (this.input.current.getOverlay()) {
            this.input.current.hide();
        } else {
            this.input.current.show();
        }
    }

    getInputValue() {
        return this.state.value;
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

    onChange = ({ value }) => {
        this.setState({ time: value }); // javascript date
        const valueStr = moment(value).format("hh:mm a");
        this.setStoreValue(valueStr); // or hh:mm a string
    };
    input: any = React.createRef();

    render() {
        const { name, label, displayCondition } = this.props;

        const { icon } = this.state;
        if (displayCondition === false) {
            return null;
        }
        return (
            <div>
                <div className="input-container">
                    <label data-name={name}>{label}</label>

                    <div className="md-input">
                        <Calendar
                            ref={this.input}
                            className={this.props.className}
                            maxDate={this.props.maxDate}
                            minDate={this.props.minDate}
                            onBlur={this.onBlur.bind(this)}
                            onChange={this.onChange}
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
