// WIP Not implelemtned
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Theater } from "../layouts/lib/Theater";

export default {
  title: "Liquid/Layout/Theater",
  component: Theater,
  argTypes: {
    left: {},
    right: {},
  },
} as ComponentMeta<typeof Theater>;

const Template: ComponentStory<typeof Theater> = (args) => (
  <Theater {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  leftWidth: 400,
};
const list = (count) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      style={{ margin: 10, width: 120, height: 20, backgroundColor: "orange" }}
    ></div>
  ));
};
const card = (count) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      style={{ margin: 10, width: 120, height: 120, backgroundColor: "yellow" }}
    ></div>
  ));
};
