import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TreeMenu from "../components/libs/TreeMenu/TreeMenu";
import "./TreeMenu.html.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/menu/TreeMenu",
  component: TreeMenu,
} as ComponentMeta<typeof TreeMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TreeMenu> = (args) => (
  <TreeMenu {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Button",
};
