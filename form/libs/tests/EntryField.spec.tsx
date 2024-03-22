import {
    act,
    fireEvent,
    getByRole,
    render,
    screen,
} from "@testing-library/react";
import { mount } from "enzyme";

import React from "react";
import { expect } from "chai";
import EntryField from "../EntryField";

import { FieldGroup, Validator, Field, Form } from "..";
const post = {
    displayName: null,
    version: 1,
    name: "test",
    id: 307,
};
const validateName = (data, field) => {
    return data[field.props.name] !== "invalidValue";
};
const getLayout = () => {
    return (
        <Form model={post}>
            <FieldGroup label="Identify">
                <EntryField name="name" label="Title" type="text">
                    <Validator
                        valid={validateName}
                        message="Invalid name"
                    ></Validator>
                </EntryField>
            </FieldGroup>
        </Form>
    );
};

describe("Field Spec", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("validate check", async () => {
        const wrapper = mount(getLayout());
        const comp = wrapper.instance() as FieldGroup;
        act(() => {
            expect(comp.validate()).to.equal(true);
        });
    });
    it("validate check - correct", async () => {
        const wrapper = render(getLayout());

        const input = wrapper.container.getElementsByTagName("input")[0];
        expect(input.value).to.equal("test");
        act(() => {
            fireEvent.change(input, { target: { value: "invalidValue" } });
            fireEvent.blur(input);
        });
        const errors =
            wrapper.container.getElementsByClassName("validation-error");
        expect(errors.length).to.equal(1);
        expect(errors[0].firstChild?.nodeName).to.equal("A");
        screen.debug();

        expect(errors[0].firstChild?.textContent).to.equal("Invalid name");
    });
    it("valid value - correct", async () => {
        const wrapper = render(getLayout());

        const input = wrapper.container.getElementsByTagName("input")[0];
        act(() => {
            fireEvent.change(input, { target: { value: "validValue" } });
            fireEvent.blur(input);
        });
        const errors =
            wrapper.container.getElementsByClassName("validation-error");
        expect(errors.length).to.equal(0);
    });
});
