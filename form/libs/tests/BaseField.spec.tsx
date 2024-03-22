import { act } from "@testing-library/react";
import Field from "../Field";

import { mount } from "enzyme";
import * as React from "react";
import { expect } from "chai";
import TimeEntryField from "../TimeEntryField";

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
});
