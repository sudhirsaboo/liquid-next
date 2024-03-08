/* eslint-disable @next/next/no-img-element */
import React from "react";
import classnames from "classnames";

class CardMediaCover extends React.Component<any, any> {
  src: any;

  render() {
    const { cover, player } = this.props;

    const myClassNames = classnames(this.props.className, {
      "card-media": true,
      stretch: this.props.stretch,
    });

    const opts = { src: undefined };
    if (!this.props.lazy) {
      opts["src"] = cover;
    }
    return (
      <div className={myClassNames}>
        <a onClick={player && player.play && player.play.bind(this)}>
          <img
            // eslint-disable-next-line react/no-string-refs
            ref="image"
            alt=""
            className="card-cover"
            data-src={cover}
            {...opts}
            onError={() =>
              (this.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")
            }
          ></img>
        </a>
        {this.props.children}
      </div>
    );
  }
}

export default CardMediaCover;
