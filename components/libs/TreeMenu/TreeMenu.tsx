import * as React from "react";
import classnames from "classnames";

import MenuItem from "./MenuItem";
import TreeView from "./TreeView";

import "./TreeMenu.scss";

class TreeMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { open: true, dataSource: this.props.dataSource };
  }

  render() {
    const myClassNames = classnames(this.props.className, {
      "side-nav-container clearfix": true,
      open: this.state.open,
    });

    return (
      <div id="dash-menu" className={myClassNames}>
        <div className={"side-nav"}>
          {this.state.dataSource?.map((node: any, i: number) => {
            return this.renderTree(node, i, 1);
          })}
        </div>
      </div>
    );
  }

  renderTree(
    item: { title: any; nodes: any[] },
    i: string | number,
    depth: number
  ) {
    const type = item.title;
    const label = <span className="node">{type}</span>;

    const key = type + "|" + i;
    const myClassNames = classnames({});

    return (
      <TreeView
        depth={depth}
        className={myClassNames}
        itemClassName="header"
        key={key}
        nodeLabel={label}
        defaultcollapsed={false}
      >
        {item.nodes.map((link) => {
          if (link.nodes && link.nodes.length) {
            return this.renderTree(link, i, ++depth);
          }
          return this.renderLeaf(link, key);
        })}
      </TreeView>
    );
  }

  renderLeaf(
    link: { nodes: any; displayCondition: boolean; title: any; to: any },
    i: React.Key | null | undefined
  ) {
    const myClassNames = classnames(this.props.className, {
      " ui-tree-arrow": true,
      leaf: !link.nodes,
      "fa fa-circle-o": !link.nodes,
    });

    if (link.displayCondition === false) {
      return null;
    }
    return (
      <div className="ui-tree">
        <MenuItem
          key={i}
          className="ui-tree-leaf"
          iconClassName={myClassNames}
          label={link.title}
          dispatch={this.props.dispatch}
          to={link.to}
        ></MenuItem>
      </div>
    );
  }
}

export default TreeMenu;
