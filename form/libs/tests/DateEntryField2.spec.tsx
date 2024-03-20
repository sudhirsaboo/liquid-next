import DateEntryField from "../DateEntryField";

import { mount } from "enzyme";
import * as React from "react";

describe("Date Entry Field", () => {
    beforeEach(() => {});
    afterEach(() => {});

    xit("Should have correct values", () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;
        const isEditable = comp.isEditable();
        expect(isEditable).toEqual(true);

        const value = DateEntryField.getStoreValue(comp.props);
        expect(value).toEqual("1975-03-15T07:00:00.000+0000");

        const forValue = DateEntryField.getFormattedValue(comp.props);
        expect(forValue).toEqual("03/15/1975");

        const inputValue = comp.getInputValue();
        expect(inputValue).toEqual("03/15/1975");

        const fieldValue = comp.getFieldValue();
        expect(fieldValue).toEqual({ start: "1975-03-15T07:00:00Z" });

        const storeValueChecked = DateEntryField.getStoreValueChecked(
            comp.props
        );
        expect(storeValueChecked).toEqual("03/15/1975");
    });

    it("User Select a new date", () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;
        comp.onChange("09/24/1978"); // User select a new date
        expect(props.model.start).toEqual("09/24/1978");
    });
});
