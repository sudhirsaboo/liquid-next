import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/liquid-layouts/card";
import {
    Form,
    FieldGroup,
    DateEntryField,
    TimeEntryField,
    EntryField,
    SelectField,
    TextArea,
    CoverSelect,
    Button,
    Buttons,
    CheckBox,
    Slider,
    TagsField,
    Validator,
} from "@/liquid-forms/index";

import "./global.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "@/liquid-styles/main.scss";

import Page from "@/liquid-layouts/theater/Page";
import { PrimeReactProvider } from "primereact/api";
import { post } from "./data";
import { within, userEvent, expect } from "@storybook/test";

const meta = {
    title: "Liquid/Form",
    component: Form,
    parameters: {
        // layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleOnChange = () => {
    form.current.validate();
    const data = form.current.collect().form;
    data.start = TimeEntryField.mergeDateAndTime(data.start, data.startTime);
};
const validateName = (data, field) => {
    return data[field.props.name] !== "invalidValue";
};
const validateForm = (value, field, model) => {
    return true;
};
const validateFG = (value, field, model) => {
    return false;
};

const form: any = React.createRef();

export const Validation: Story = {
    render: () => (
        <PrimeReactProvider>
            <Page>
                <Card>
                    <CardHeader label="Programs"></CardHeader>
                    <CardContent>
                        <Form ref={form} model={post}>
                            <Validator
                                valid={validateForm}
                                message="Invalid form"
                            ></Validator>
                            <FieldGroup label="Identify">
                                <EntryField
                                    name="name"
                                    label="Title"
                                    type="text"
                                >
                                    <Validator
                                        valid={validateName}
                                        message="Invalid name"
                                    ></Validator>
                                </EntryField>
                            </FieldGroup>

                            <FieldGroup label="Copy Right" select="copyright">
                                <Validator
                                    valid={validateFG}
                                    message="Invalid FG"
                                ></Validator>
                                <CheckBox
                                    name="super"
                                    label="Super1"
                                ></CheckBox>
                                <CheckBox
                                    name="super1"
                                    label="Super2"
                                ></CheckBox>
                                <CheckBox
                                    name="super2"
                                    label="Super3"
                                ></CheckBox>
                            </FieldGroup>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Buttons>
                            <Button label="Cancel" />
                            <Button label="Ok" onClick={handleOnChange} />
                        </Buttons>
                    </CardFooter>
                </Card>
            </Page>
        </PrimeReactProvider>
    ),
    play: async ({ canvasElement }) => {
        //storybook.js.org/docs/writing-tests/interaction-testing
        const canvas: Node = within(canvasElement);
        const input = canvas.getByTestId("test-name");
        await userEvent.click(input);
        await userEvent.clear(input, "");
        await userEvent.type(input, "invalidValue");
        const okBtn = canvas.getByRole("button", { name: /Ok/i });
        await expect(okBtn).toBeInTheDocument();
        await userEvent.click(okBtn);
        await expect(canvas.getByText("Invalid name")).toBeInTheDocument();
        await userEvent.click(input);
        await userEvent.clear(input);
        await userEvent.type(input, "validValue");
        await userEvent.tab();
        await expect(
            canvas.queryByText("Invalid name")
        ).not.toBeInTheDocument();
    },
};
