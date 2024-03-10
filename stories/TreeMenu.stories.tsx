import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import TreeMenu from "../components/libs/TreeMenu/TreeMenu";
import "./TreeMenu.html.css";
import Menu from "./side-nav.json";

const meta = {
  title: "components/menu/TreeMenu",
  component: TreeMenu,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TreeMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <TreeMenu dataSource={Menu.json} />,
};
