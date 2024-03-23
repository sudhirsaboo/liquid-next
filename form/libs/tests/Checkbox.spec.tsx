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
import CheckBox from "../CheckBox";

import { FieldGroup, Validator, Field, Form } from "..";

const validateName = (data, field) => {
    return data[field.props.name] !== "invalidValue";
};
const getLayout = (post) => {
    return (
        <Form model={post}>
            <FieldGroup label="Identify">
                <CheckBox name="super" label="Super1"></CheckBox>
            </FieldGroup>
        </Form>
    );
};

describe("Field Spec", () => {
    beforeEach(() => {});
    afterEach(() => {});

    it("checked or unchecked", async () => {
        const post = {
            super: false,
            version: 1,
            name: "test",
            id: 307,
        };
        const wrapper = mount(getLayout(post));
        const comp = wrapper.instance() as Form;
        expect(comp.validate()).to.equal(true);
        const input = wrapper.find(".p-checkbox");
        input.simulate("click");
        expect(comp.collect("test-1")).to.deep.equal({
            form: { id: "test-1", super: true },
        });
        //const input = wrapper.find(".p-checkbox-box");
        input.simulate("click");
        expect(comp.collect("test-1")).to.deep.equal({
            form: { id: "test-1", super: false },
        });
        input.simulate("click");
        expect(comp.collect("test-1")).to.deep.equal({
            form: { id: "test-1", super: true },
        });
    });
});
