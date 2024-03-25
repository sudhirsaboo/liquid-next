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
import TextArea from "../TextArea";

import { FieldGroup, Validator, Field, Form } from "..";

function hasInputValue(e, inputValue: string) {
    return screen.getByDisplayValue(inputValue) === e;
}
const post = {
    displayName: null,
    version: 1,
    description: "test",
    id: 307,
};
const validateName = (data, field) => {
    return data[field.props.name] !== "invalidValue";
};
const getLayout = () => {
    return (
        <Form model={post}>
            <FieldGroup label="Identify">
                <TextArea
                    name="description"
                    label="Title"
                    type="text"
                    required={true}
                >
                    <Validator
                        valid={validateName}
                        message="Invalid description"
                    ></Validator>
                </TextArea>
            </FieldGroup>
        </Form>
    );
};

describe("Field Spec", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("validate check", async () => {
        const wrapper = mount(getLayout());
        const comp = wrapper.instance() as Form;
        act(() => {
            expect(comp.validate()).to.equal(true);
        });
        act(() => {
            expect(comp.collect("test-1")).to.deep.equal({
                form: { id: "test-1", description: "test" },
            });
        });
    });
    it("clear check", async () => {
        const wrapper = mount(getLayout());
        const comp = wrapper.instance() as Form;
        act(() => {
            comp.clear();
            //expect(wrapper.find("input").prop("value")).to.equal("");
        });
    });
    it("validate check - correct", async () => {
        const wrapper = render(getLayout());

        const input = wrapper.container.getElementsByTagName("textarea")[0];
        expect(input.textContent).to.equal("test");
        act(() => {
            fireEvent.change(input, { target: { value: "invalidValue" } });
            fireEvent.blur(input);
        });
        const errors =
            wrapper.container.getElementsByClassName("validation-error");
        expect(errors.length).to.equal(1);
        expect(errors[0].firstChild?.nodeName).to.equal("A");

        expect(errors[0].firstChild?.textContent).to.equal(
            "Invalid description"
        );
    });
    it("valid value - no error msg", async () => {
        const wrapper = render(getLayout());

        const input = wrapper.container.getElementsByTagName("textarea")[0];
        act(() => {
            fireEvent.change(input, { target: { value: "validValue" } });
            fireEvent.blur(input);
        });
        const errors =
            wrapper.container.getElementsByClassName("validation-error");
        expect(errors.length).to.equal(0);
    });
    it("validate check", async () => {
        const wrapper = mount(getLayout());
        const comp = wrapper.instance() as Form;
        act(() => {
            comp.submit();
        });
    });
});
