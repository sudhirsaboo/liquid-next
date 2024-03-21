import { act } from "@testing-library/react";
import TimeEntryField from "../TimeEntryField";

import { mount } from "enzyme";
import * as React from "react";
import { expect } from "chai";

describe("Time Entry Field", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("Should have correct values", () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000", startTime: null },
            name: "startTime",
            type: "Time",
        };
        TimeEntryField.fillDateAndTime("start", props.model);

        const wrapper = mount(<TimeEntryField {...props} />);
        const comp = wrapper.instance() as TimeEntryField;
        const isEditable = comp.isEditable();
        expect(isEditable).to.equal(true);

        const value = TimeEntryField.getStoreValue(comp.props);
        expect(value).to.equal("07:00 pm", "getStoreValue");

        const forValue = TimeEntryField.getFormattedValue(comp.props);
        expect(forValue).to.equal("07:00 pm", "getFormattedValue");

        const inputValue = comp.getInputValue();
        expect(inputValue).to.equal("07:00 pm", "getInputValue");

        const fieldValue = comp.getFieldValue();
        expect(fieldValue).to.deep.equal(
            { startTime: "07:00 pm" },
            "getFieldValue"
        );

        /* const storeValueChecked = TimeEntryField.getStoreValueChecked(
            comp.props
        );
        expect(storeValueChecked).to.equal(
            "03/15/1975",
            "getStoreValueChecked"
        ); */

        const submitValue = comp.getSubmitValue();
        expect(submitValue).to.equal("07:00 pm", "Submit Value");

        props.model.start = TimeEntryField.mergeDateAndTime(
            props.model.start,
            props.model.startTime
        );

        const displayValue = TimeEntryField.announceDateTime(props.model.start);
        expect(displayValue).to.equal("15/03/1975 07:00 pm", "Display Value");
    });

    it("User Select a new date now", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        let wrapper;
        wrapper = mount(<TimeEntryField {...props} />);

        const comp = wrapper.instance() as TimeEntryField;

        await act(async () => {
            comp.onChange({ value: new Date() });
        });
        wrapper.update();
        // User select a new date
        // expect(comp.getInputValue()).to.equal("09/24/1978", "getInputValue");
    });
});
