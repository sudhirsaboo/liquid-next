import DateEntryField from "../DateEntryField";

import { mount } from "enzyme";
import * as React from "react";

import * as sinon from "sinon";
import { expect } from "../../../../../../test/expect";

describe("Date Entry Field", () => {
    let sinonSandbox;

    beforeEach(() => {
        sinonSandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sinonSandbox.restore();
    });

    xit("Should have correct values", () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date"
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;
        const isEditable = comp.isEditable();
        expect(isEditable).to.equal(true);

        const value = DateEntryField.getStoreValue(comp.props);
        expect(value).to.equal(
            "1975-03-15T07:00:00.000+0000",
            "Should select correct value from the model"
        );

        const forValue = DateEntryField.getFormattedValue(comp.props);
        expect(forValue).to.equal(
            "03/15/1975",
            "Formatted value should be in MM/DD/YYYY Format"
        );

        const inputValue = comp.getInputValue();
        expect(inputValue).to.equal(
            "03/15/1975",
            "HTML Input should have right value"
        );

        const fieldValue = comp.getFieldValue();
        expect(fieldValue).to.deep.equal(
            { start: "1975-03-15T07:00:00Z" },
            "From  HTML Input field to json should have correct json"
        );

        const storeValueChecked = DateEntryField.getStoreValueChecked(
            comp.props
        );
        expect(storeValueChecked).to.deep.equal("03/15/1975", " ");
    });

    it("User Select a new date", () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date"
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;
        comp.handleDateSelect("09/24/1978"); // User select a new date
        expect(props.model.start).to.equal("09/24/1978");
    });
});
