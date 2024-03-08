import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { SplitScreen } from "../layouts/lib/SplitScreen";
import "./html.css";

const meta = {
  title: "Liquid/Layout/SplitScreen",
  component: SplitScreen,
  parameters: {
    layout: "centered",
  },
  // tags: ["autodocs"],
  argTypes: {
    left: {},
    right: {},
  },
} satisfies Meta<typeof SplitScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeftDash: Story = {};

LeftDash.args = {
  leftWidth: 400,
  Header: () => {
    return (
      <div style={{ display: "flex", backgroundColor: "red" }}>
        <h1>Header</h1>
      </div>
    );
  },
  Left: () => {
    return (
      <div style={{ display: "flex", backgroundColor: "green" }}>
        <div style={{}}>{list(100)}</div>
      </div>
    );
  },
  Right: () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "orange",
          }}
        >
          <h1>Tabs</h1>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "grey",
            height: "100%",
            overflow: "auto",
            justifyContent: "center",
            flexFlow: "row wrap",
          }}
        >
          {card(301)}
        </div>
      </div>
    );
  },
};

export const RightDash: Story = {};

RightDash.args = {
  rightWidth: 400,
  Header: LeftDash.args.Header,
  Right: LeftDash.args.Left,
  Left: LeftDash.args.Right,
};

const list = (count: number) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      key={i}
      style={{ margin: 10, width: 120, height: 20, backgroundColor: "orange" }}
    ></div>
  ));
};
const card = (count: number) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      key={i}
      style={{ margin: 10, width: 120, height: 120, backgroundColor: "yellow" }}
    ></div>
  ));
};
