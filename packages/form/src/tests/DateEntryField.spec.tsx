import React from "react";

import DateEntryField from "../DateEntryField";
import {
    fireEvent,
    getByRole,
    render,
    screen,
    act,
} from "@testing-library/react";

describe("Date Entry Field", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("User Select a new date", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000" },
            name: "start",
            type: "Date",
        };
        const { container, getByRole } = render(<DateEntryField {...props} />);
        const inputNode = container.getElementsByTagName("input")[0];
        expect(inputNode.value).toEqual("03/15/1975");

        fireEvent.input(inputNode, { target: { value: "09/24/1978" } });

        expect(inputNode.value).toEqual("09/24/1978");

        fireEvent.click(inputNode);
        // Open Calendar
        const icon = screen.getByRole("button");
        expect(icon).not.toEqual(undefined);
        await act(async () => {
            fireEvent.click(icon);
        });

        // TODOexpect(screen.getByLabelText("Choose Date")).toBeInTheDocument();

        // Close
        await act(async () => {
            fireEvent.click(icon);
        });
        // TODO expect(screen.getByLabelText("Choose Date")).not.toBeInTheDocument();
    });
    it("valueToDate", () => {
        const res = DateEntryField.valueToDate("03/15/1975", "MM/DD/YYYY");

        expect(res.toDateString()).toEqual("Sat Mar 15 1975");
    });
    it("fillDateAndTime", () => {
        const post = {
            start: "2024-02-28T18:30:00.000+0000",
            startDate: null,
        };
        DateEntryField.fillDate("start", post);

        console.log(post);
        expect(post.startDate).toEqual("02/29/2024");
    });
});
