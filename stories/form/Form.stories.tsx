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
    EntryField,
    SelectField,
    TextArea,
    CoverSelect,
    Button,
    Buttons,
    CheckBox,
    Slider,
    TagsField,
} from "@/liquid-forms/index";

import "./global.css";
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";
import "@/liquid-styles/main.scss";

import Page from "@/liquid-layouts/theater/Page";
import TimeEntryField from "@/liquid-forms/easy/TimeEntryField";
import { PrimeReactProvider } from "primereact/api";

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
const post = {
    organization: {
        displayName: "IStrokes Studio",
        name: "ISTROKES",
        id: "5",
    },
    user: 68,
    cover: 400,
    start: "2024-02-28T18:30:00.000+0000",
    end: "2024-03-30T18:30:00.000+0000",
    displayName: null,
    version: 1,
    name: "test",
    id: 307,
    description: "HARD",
    statement: "HARD",
    technical: 7,
    super: true,
    fee: 100,
    tags: ["test1", "test2"],
};
TimeEntryField.fillDateAndTime("start", post);

const entities = {
    organizations: {
        "5": {
            cover: null,
            parent: null,
            displayName: "IStrokes Studio",
            version: 1,
            name: "ISTROKES",
            id: 5,
        },
        "51": {
            cover: null,
            parent: null,
            displayName: "IStrokes Studio 2",
            version: 1,
            name: "ISTROKES 2",
            id: 51,
        },
    },
};
const organizations = {
    organizations: {
        isFetching: false,
        items: [5, 51],
        page: {
            size: 20,
            totalElements: 1,
            totalPages: 1,
            number: 0,
        },
    },
};
const handleOnChange = () => {
    const data = form.current.collect().form;
    data.start = TimeEntryField.mergeDateAndTime(data.start, data.startTime);
    alert(JSON.stringify(data));
    alert(TimeEntryField.announceDateTime(data.start));
};
const form: any = React.createRef();

export const Primary: Story = {
    render: () => (
        <PrimeReactProvider>
            <Page>
                <Card>
                    <CardHeader label="Programs"></CardHeader>
                    <CardContent>
                        <Form ref={form} model={post}>
                            <FieldGroup label="Identify">
                                <EntryField
                                    name="name"
                                    label="Title"
                                    type="text"
                                ></EntryField>
                                <TextArea
                                    name="statement"
                                    label="Statement"
                                    placeholder="Statement"
                                    type="text"
                                    field-type="textarea"
                                ></TextArea>
                            </FieldGroup>
                            <FieldGroup>
                                <SelectField
                                    wholeObject
                                    label="Parent Account"
                                    select="organization"
                                    name="id"
                                    options={entities.organizations}
                                    optionsId={organizations}
                                    playlist={"organizations"}
                                    required
                                ></SelectField>
                                {
                                    <DateEntryField
                                        name="start"
                                        label="Start Date"
                                    ></DateEntryField>
                                }
                                <TimeEntryField
                                    name="startTime"
                                    label="Start Time"
                                    required={false}
                                ></TimeEntryField>
                                <FieldGroup
                                    label="Copy Right"
                                    select="copyright"
                                >
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
                                <Slider
                                    config={{ pinned: true, snaps: true }}
                                    name="technical"
                                    label="Technical Competency"
                                />
                                <TagsField name="tags" label="Tags"></TagsField>
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
};
