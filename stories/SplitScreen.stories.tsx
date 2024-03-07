import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SplitScreen } from "../layouts/lib/SplitScreen";

export default {
  title: "Liquid/Layout/SplitScreen",
  component: SplitScreen,
  argTypes: {
    left: {},
    right: {},
  },
} as ComponentMeta<typeof SplitScreen>;

const Template: ComponentStory<typeof SplitScreen> = (args) => (
  <SplitScreen {...args} />
);

export const Left = Template.bind({});
Left.args = {
  leftWidth: 400,
  header: () => {
    return (
      <div style={{ display: "flex", backgroundColor: "red" }}>
        <h1>Header</h1>
      </div>
    );
  },
  left: () => {
    return (
      <div style={{ display: "flex", backgroundColor: "green" }}>
        <div style={{}}>{list(100)}</div>
      </div>
    );
  },
  right: () => {
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

export const Right = Template.bind({});
Right.args = {
  rightWidth: 400,
  header: Left.args?.header,
  right: Left.args.left,
  left: Left.args.right,
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
