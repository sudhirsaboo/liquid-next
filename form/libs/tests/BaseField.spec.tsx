import { act } from "@testing-library/react";
import Field from "../Field";

import { mount } from "enzyme";
import * as React from "react";
import { expect } from "chai";
import TimeEntryField from "../TimeEntryField";
import DateEntryField from "../DateEntryField";

describe("Field Spec", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("dateToValue", async () => {
        expect(
            Field.dateToValue("03/15/1975", "MM/DD/YYYY", "MM/DD/YYYY")
        ).to.equal("03/15/1975");
        expect(
            Field.dateToValue("2024-02-28T18:30:00.000+0000", "MM/DD/YYYY")
        ).to.equal("02/29/2024");
        expect(
            Field.dateToValue(
                new Date("2024-02-28T18:30:00.000+0000"),
                "MM/DD/YYYY"
            )
        ).to.equal("02/29/2024");
    });
    it("getStoreValueInFormat", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
            format: "DD/MM/YYYY",
        };
        expect(Field.getStoreValueInFormat(props)).to.equal("15/03/1975");
    });
    it("getFormattedValue", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
            format: "DD/MM/YYYY", // out format
        };
        expect(Field.getFormattedValue(props)).to.equal("15/03/1975");
    });
    it("getFormattedValue - Time", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "startTime",
            type: "Time",
            format: "hh mm a", // out format
        };
        TimeEntryField.fillDateAndTime("start", props.model);

        expect(Field.getFormattedValue(props)).to.equal("07 00 pm");
    });
    it("setStoreValue", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;

        expect(comp.setStoreValue("03/15/1975", props)).to.deep.equal({
            start: "03/15/1975",
        });
    });
    it("getStoreValue", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;

        expect(Field.getStoreValue(props)).to.equal(
            "1975-03-15T07:00:00.000+0000"
        );
    });
    it("setStoreValue - fgselect", async () => {
        const props = {
            model: { dates: { start: "1975-03-15T07:00:00.000+0000" } },
            name: "start",
            type: "Date",
            fgselect: "dates",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;

        expect(comp.setStoreValue("03/15/1975", props)).to.deep.equal({
            start: "03/15/1975",
        });
    });
    it("getStoreValue - fgselect", async () => {
        const props = {
            model: { dates: { start: "1975-03-15T07:00:00.000+0000" } },
            name: "start",
            type: "Date",
            fgselect: "dates",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;

        expect(Field.getStoreValue(props)).to.equal(
            "1975-03-15T07:00:00.000+0000"
        );
    });
    it("setStoreValue - select", async () => {
        const props = {
            model: { dates: { start: "1975-03-15T07:00:00.000+0000" } },
            name: "start",
            type: "Date",
            select: "dates",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;

        expect(comp.setStoreValue("03/15/1975", props)).to.deep.equal({
            start: "03/15/1975",
        });
    });
    it("getStoreValue - select", async () => {
        const props = {
            model: { dates: { start: "1975-03-15T07:00:00.000+0000" } },
            name: "start",
            type: "Date",
            select: "dates",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;

        expect(Field.getStoreValue(props)).to.equal(
            "1975-03-15T07:00:00.000+0000"
        );
    });
    it("getFieldValue and  getSubmitValue", async () => {
        const props = {
            model: { dates: { start: "1975-03-15T07:00:00.000+0000" } },
            name: "start",
            type: "Date",
            select: "dates",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;
        expect(comp.getSubmitValue()).to.equal(
            "1975-03-14T18:30:00Z",
            "Submit Value"
        );
        expect(comp.getFieldValue()).to.deep.equal(
            { dates: { start: "1975-03-14T18:30:00Z" } },
            "Field Value"
        );
    });
    it("collect", async () => {
        const props = {
            model: { dates: { start: "1975-03-15T07:00:00.000+0000" } },
            name: "start",
            type: "Date",
            select: "dates",
        };
        const wrapper = mount(<DateEntryField {...props} />);
        const comp = wrapper.instance() as DateEntryField;
        expect(comp.collect()).to.deep.equal(
            { dates: { start: "1975-03-14T18:30:00Z" } },
            "Field Value"
        );
    });
});
