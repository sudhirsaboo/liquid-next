import React from "react";

import TimeEntryField from "../TimeEntryField";
import {
    act,
    fireEvent,
    getByRole,
    render,
    screen,
} from "@testing-library/react";

describe("Time Entry Field", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("User Select a new time", async () => {
        const props = {
            model: { start: "1975-03-15T07:00:00.000+0000", startTime: null },
            name: "start",
            type: "Time",
        };
        TimeEntryField.fillDateAndTime("start", props.model);

        const { container, getByRole } = render(<TimeEntryField {...props} />);
        const inputNode = container.getElementsByTagName("input")[0];
        expect(inputNode.value).toEqual("07:00 PM");

        // Open Calendar
        const icon = screen.getByRole("button");
        expect(icon).not.toEqual(undefined);
        await act(async () => {
            fireEvent.click(icon);
        });

        //TODO expect(screen.getByLabelText("Choose Date")).toBeInTheDocument();

        // Close
        await act(async () => {
            fireEvent.click(icon);
        });
        // TODO expect(screen.getByLabelText("Choose Date")).not.toBeInTheDocument();
    });

    it("valueToDate", () => {
        // const res = TimeEntryField.valueToDate("03/15/1975", "MM/DD/YYYY");
        //expect(res.toDateString()).toEqual("Sat Mar 15 1975");
    });
    it("fillDateAndTime", () => {
        const post = {
            start: "2024-02-28T18:30:00.000+0000",
            startDate: null,
            startTime: null,
        };
        TimeEntryField.fillDateAndTime("start", post);

        expect(post.startTime).toEqual("08:30 pm");
        expect(post.startDate).toEqual("02/29/2024");
    });
});
