import React from "react";
import { styled } from "@storybook/theming";

import { Icons } from "../components/libs/Icon/Icon";
import icons, { IconKey } from "../components/libs/Icon/Icons";

const Meta = styled.div({
  color: "#333",
  fontSize: 12,
});

interface ItemProps {
  minimal?: boolean;
}

const Item = styled.div<ItemProps>(
  {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "0 1 20%",
    minWidth: 120,

    padding: "0px 7.5px 20px",

    "& svg": {
      marginRight: 10,
      width: 24,
      height: 24,
    },
  },
  ({ minimal }) =>
    minimal
      ? {
          flex: "none",
          minWidth: "auto",
          padding: 0,
          background: "#fff",
          border: "1px solid #666",

          "& svg": {
            display: "block",
            marginRight: 0,
            width: 48,
            height: 48,
          },
        }
      : {}
);

const List = styled.div({
  display: "flex",
  flexFlow: "row wrap",
});

const list = Object.keys(icons).sort() as IconKey[];

export default { title: "Icon" };

export const Primary = () => (
  <List>
    {list.map((key) => (
      <Item key={key}>
        <Icons icon={key} /> <Meta>{key}</Meta>
      </Item>
    ))}
  </List>
);
export const Secondary = () => (
  <List>
    {list.map((key) => (
      <Item minimal key={key}>
        <Icons icon={key} />
      </Item>
    ))}
  </List>
);
