import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { card, list } from "./skeleton";

import SplitScreen from "../layouts/lib/SplitScreen";
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

export const Primary: Story = {
  render: () => (
    <SplitScreen
      leftwidth="300"
      Header={
        <div style={{ display: "flex", backgroundColor: "red" }}>
          <h1>Header</h1>
        </div>
      }
      Left={
        <div style={{ display: "flex", backgroundColor: "green" }}>
          <div style={{}}>{list(100)}</div>
        </div>
      }
      Right={
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
      }
    ></SplitScreen>
  ),
};
