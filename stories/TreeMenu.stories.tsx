import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import TreeMenu from "../components/libs/TreeMenu/TreeMenu";
import "./TreeMenu.html.css";

const meta = {
  title: "components/menu/TreeMenu",
  component: TreeMenu,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TreeMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

Primary.args = {
  primary: true,
  label: "Button",
};
