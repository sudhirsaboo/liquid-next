/* eslint-disable @next/next/no-img-element */
import React from "react";
import classnames from "classnames";
// import Close from "../button/Close";
class CardHeader extends React.Component<any, any> {
    render() {
        const myClassNames2 = classnames(this.props.className, {
            "md-toolbar": true,
            "media-card-header": true,
        });

        return (
            <div className={myClassNames2}>
                <div className="md-toolbar-tools">
                    {this.props.logo ? (
                        <div className="logo-container">
                            <img className="logo" src={this.props.logo} />
                        </div>
                    ) : null}

                    <span> {this.props.label}</span>
                    <span className="flex-override"></span>

                    {/*  {this.props.onClose ? (
            <Close className="close" onClick={this.props.onClose}>
              ×
            </Close>
          ) : null} */}
                </div>

                {this.props.children}
            </div>
        );
    }
}
export default CardHeader;
