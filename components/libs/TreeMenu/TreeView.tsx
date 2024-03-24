import React from "react";
// import { ReactComponent as TreeExpandSVG } from "../../assets/tree-expand.svg";
// import { ReactComponent as GridSvg } from "../../assets/grid.svg";

class TreeView extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            collapsed: false,
        };
    }

    handleClick = (...args: any[]) => {
        this.setState({ collapsed: !this.state.collapsed });
        if (this.props.onClick) {
            this.props.onClick(...args);
        }
    };

    render() {
        const {
            collapsed = this.state.collapsed,
            className = "",
            itemClassName = "",
            nodeLabel,
            depth,
            children,
            ...rest
        } = this.props;

        let arrowClassName = "ui-tree-arrow";
        let containerClassName = "ui-tree-children";
        if (collapsed) {
            arrowClassName += " ui-tree-arrow-collapsed";
            containerClassName += " ui-tree-children-collapsed";
        }

        const arrow = (
            <div
                {...rest}
                className={className + " " + arrowClassName}
                onClick={this.handleClick}
            >
                {/* {<TreeExpandSVG />} */}
            </div>
        );

        return (
            <div data-depth={depth} className="ui-tree">
                <div
                    onClick={this.handleClick}
                    className={"ui-tree-item " + itemClassName}
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        minWidth: "0px",
                    }}
                >
                    {arrow}
                    <div
                        style={{
                            color: "rgb(217, 217, 217)",
                            paddingRight: "4px",
                        }}
                    >
                        {/*             {<GridSvg />}
                         */}{" "}
                    </div>
                    {nodeLabel}
                </div>
                <div
                    style={{ marginLeft: "40px" }}
                    className={containerClassName}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default TreeView;
