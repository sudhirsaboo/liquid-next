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
const formClear = () => {
    form.current.clear();
};
const handleOnChange = () => {
    alert(form.current.validate());
    const data = form.current.collect("test01", false).form;
    alert(JSON.stringify(data));
    data.start = TimeEntryField.mergeDateAndTime(data.start, data.startTime);
};
const validateName = (data, field) => {
    return data[field.props.name] !== "invalidValue";
};
const validateDesc = (data, field) => {
    return data[field.props.name] !== "invalidValue";
};
const validateForm = (value, field, model) => {
    return true;
};
const validateFG = (value, field, { model: { copyright, name } }) => {
    //const data = form.current.collect("test01", false).form;
    //console.log(copyright);

    return copyright.super1 && copyright.super3;
    //return true;
};

const form: any = React.createRef();

export const Layout: Story = {
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
                            <FieldGroup
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "10px 10px",
                                }}
                            >
                                <FieldGroup label="Left">
                                    <EntryField
                                        name="name"
                                        label="Title"
                                        type="text"
                                        required={true}
                                    >
                                        <Validator
                                            valid={validateName}
                                            message="Invalid name"
                                        ></Validator>
                                    </EntryField>
                                    <EntryField
                                        name="field1"
                                        label="Field"
                                        type="text"
                                        required={true}
                                    ></EntryField>
                                    <EntryField
                                        name="field2"
                                        label="Field2"
                                        type="text"
                                    ></EntryField>
                                    <EntryField
                                        name="field3"
                                        label="Field3"
                                        type="text"
                                    ></EntryField>
                                    <EntryField
                                        name="field4"
                                        label="Field4"
                                        type="text"
                                    ></EntryField>
                                </FieldGroup>
                                <FieldGroup label="Right">
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
                                    <EntryField
                                        name="field1"
                                        label="Field"
                                        type="text"
                                    ></EntryField>
                                    <EntryField
                                        name="field2"
                                        label="Field2"
                                        type="text"
                                    ></EntryField>
                                    <EntryField
                                        name="field3"
                                        label="Field3"
                                        type="text"
                                    ></EntryField>
                                    <EntryField
                                        name="field4"
                                        label="Field4"
                                        type="text"
                                    ></EntryField>
                                </FieldGroup>
                            </FieldGroup>
                            <FieldGroup label="Copy Right" select="copyright">
                                <Validator
                                    valid={validateFG}
                                    message="Invalid FG"
                                ></Validator>
                                <CheckBox
                                    name="super1"
                                    label="Super1"
                                ></CheckBox>
                                <CheckBox
                                    name="super2"
                                    label="Super2"
                                ></CheckBox>
                                <CheckBox
                                    name="super3"
                                    label="Super3"
                                ></CheckBox>
                            </FieldGroup>
                        </Form>
                    </CardContent>
                    <CardFooter>
                        <Buttons>
                            <Button label="Clear" onClick={formClear} />
                            <Button label="Cancel" />
                            <Button label="Ok" onClick={handleOnChange} />
                        </Buttons>
                    </CardFooter>
                </Card>
            </Page>
        </PrimeReactProvider>
    ),
};
