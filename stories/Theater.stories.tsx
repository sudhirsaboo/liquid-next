// WIP Not implelemtned
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Theater } from "../layouts/lib/Theater";
import { Stage } from "../layouts/lib/Stage";
import styled from "styled-components";

export default {
  title: "Liquid/Layout/Theater",
  component: Theater,
  argTypes: {
    left: {},
    right: {},
  },
} as ComponentMeta<typeof Theater>;

const Announcer = styled.div`
  width: 330px;
  margin: 10px;
  border: 1px solid #a9abae;
`;

const Template: ComponentStory<typeof Theater> = (args) => (
  <Theater {...args}>
    <Stage>
      <div
        style={{
          display: "flex",
          height: "100%",
          overflow: "auto",
          justifyContent: "center",
          flexFlow: "row wrap",
        }}
      >
        {card(25)}
      </div>
    </Stage>
    <Announcer>Announcer here can be a card or a form</Announcer>
  </Theater>
);

export const Primary = Template.bind({});
Primary.args = {
  leftWidth: 400,
};
const list = (count: any) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      key={i}
      style={{ margin: 10, width: 120, height: 20, backgroundColor: "orange" }}
    ></div>
  ));
};
const card = (count: any) => {
  return Array.apply(null, new Array(count)).map((e, i) => (
    <div
      key={i}
      style={{ margin: 10, width: 120, height: 120, backgroundColor: "yellow" }}
    ></div>
  ));
};
