import "@/jsdom.config";

import React from "react";

import DateEntryField from "../DateEntryField";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";

describe("Date Entry Field", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("User Select a new date", () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const { container, getByPlaceholderText, getByText } = render(
            <DateEntryField {...props} />
        );
        const inputNode = container.getElementsByTagName("input")[0];
        expect(inputNode.value).toEqual("03/15/1975");

        fireEvent.input(inputNode, { target: { value: "09/24/1978" } });

        expect(inputNode.value).toEqual("09/24/1978");
    });
    it("valueToDate", () => {
        const res = DateEntryField.valueToDate("03/15/1975", "MM/DD/YYYY");

        expect(res.toDateString()).toEqual("Sat Mar 15 1975");
    });
});
