import { act } from "@testing-library/react";
import DateEntryField from "../DateEntryField";

import { mount } from "enzyme";
import * as React from "react";
import { expect } from "chai";

describe("Date Entry Field", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("Should have correct values", () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;
        const isEditable = comp.isEditable();
        expect(isEditable).to.equal(true);

        const value = DateEntryField.getStoreValue(comp.props);
        expect(value).to.equal("1975-03-15T07:00:00.000+0000");

        const forValue = DateEntryField.getFormattedValue(comp.props);
        expect(forValue).to.equal("03/15/1975");

        const inputValue = comp.getInputValue();
        expect(inputValue).to.equal("03/15/1975");

        const fieldValue = comp.getFieldValue();
        expect(fieldValue).to.deep.equal({ start: "1975-03-14T18:30:00Z" });

        const storeValueChecked = DateEntryField.getStoreValueChecked(
            comp.props
        );
        expect(storeValueChecked).to.equal("03/15/1975");

        const submitValue = comp.getSubmitValue();
        expect(submitValue).to.equal("1975-03-14T18:30:00Z", "Submit Value");

        const displayValue = DateEntryField.announceDate(
            submitValue,
            "MM/DD/YYYY"
        );
        expect(displayValue).to.equal("03/15/1975", "Display Value");
    });

    it("User Select a new date now", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        let wrapper;
        wrapper = mount(<DateEntryField {...props} />);

        const comp = wrapper.instance() as DateEntryField;

        await act(async () => {
            comp.onChange({ value: "09/24/1978" });
        });
        wrapper.update();
        // User select a new date
        expect(comp.getInputValue()).to.equal("09/24/1978");
    });
});
