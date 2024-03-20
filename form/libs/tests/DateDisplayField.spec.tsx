import DateDisplayField from "../DateDisplayField";

import { mount } from "enzyme";
import * as React from "react";

import { expect } from "chai";

describe("Date Display Field", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("Should have correct values", () => {
        const props = {
            model: { start: "1975-03-15T08:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const wrapper = mount(<DateDisplayField {...props} />);
        const comp = wrapper.instance() as DateDisplayField;
        const isEditable = comp.isEditable();
        expect(isEditable).to.equal(false);

        const value = DateDisplayField.getStoreValue(comp.props);
        expect(value).to.equal(
            "1975-03-15T08:00:00.000+0000",
            "Should select correct value from the model"
        );

        const forValue = DateDisplayField.getFormattedValue(comp.props);
        expect(forValue).to.equal(
            "03/15/1975",
            "Formatted value should be in MM/DD/YYYY Format"
        );

        /* const inputValue = comp.getInputValue();
        expect(inputValue).to.equal(
            "03/15/1975",
            "HTML Input should have right value"
        ); */

        /*   const fieldValue = comp.getFieldValue();
        expect(fieldValue).to.deep.equal(
            { start: "03/15/1975" },
            "From  HTML Input field to json should have correct json"
        ); */

        const storeValueChecked = DateDisplayField.getStoreValueChecked(
            comp.props
        );
        expect(storeValueChecked).to.deep.equal("03/15/1975", " ");
    });

    it("Should have correct state", () => {
        const props = {
            model: { start: "1975-03-15T08:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const wrapper = mount(<DateDisplayField {...props} />);
        const comp = wrapper.instance() as DateDisplayField;
        expect(comp.state).to.deep.equal(
            {
                dateActive: false,
                format: "MM/DD/YYYY",
                value: "03/15/1975",
                prevProps: comp.state.prevProps,
            },
            "Should have correct state initially"
        );
        wrapper.setProps({
            model: { start: "1978-09-24T08:00:00.000+0000" },
            name: "start",
            type: "Date",
        });

        expect(comp.state).to.deep.equal(
            {
                dateActive: false,
                format: "MM/DD/YYYY",
                value: "09/24/1978",
                prevProps: comp.state.prevProps,
            },
            "Should have updated state on changes"
        );
        console.log(comp.state);
    });
});
