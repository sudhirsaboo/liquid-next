https://storybook.js.org/docs/api/csf

```tsx
export const Text = {
  args: {
    label: "Hello",
    onClick: action("clicked"),
  },
  render: ({ label, onClick }) => <Button label={label} onClick={onClick} />,
};
```
