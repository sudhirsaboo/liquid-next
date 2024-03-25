Intuitive forms for react

Quick Start
npm install @liquid101/form

```tsx
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
```

```tsx
<Form ref={form} model={post}>
    <Validator valid={validateForm} message="Invalid form"></Validator>
    <FieldGroup label="Identify">
        <EntryField name="name" label="Title" type="text">
            <Validator valid={validateName} message="Invalid name"></Validator>
        </EntryField>
        <TextArea name="description" label="Title" type="text">
            <Validator
                valid={validateDesc}
                message="Invalid description"
            ></Validator>
        </TextArea>
    </FieldGroup>

    <FieldGroup label="Copy Right" select="copyright">
        <Validator valid={validateFG} message="Invalid FG"></Validator>
        <CheckBox name="super1" label="Super1"></CheckBox>
        <CheckBox name="super2" label="Super2"></CheckBox>
        <CheckBox name="super3" label="Super3"></CheckBox>
    </FieldGroup>
</Form>
```
