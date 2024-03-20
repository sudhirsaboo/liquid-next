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
        const { getByPlaceholderText, getByText } = render(
            <DateEntryField {...props} />
        );
        const inputNode = screen.getByRole("combobox");

        fireEvent.change(inputNode, { target: { value: "09/24/1978" } });

        expect(props.model.start).toEqual("09/24/1978");
    });
});
