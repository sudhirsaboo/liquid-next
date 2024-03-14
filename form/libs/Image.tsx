import * as React from "react";
import * as classnames from "classnames";

class Image extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            prevProps: null
        };
    }

    onImageLoad() {
        this.setState({ loaded: true });
    }

    componentDidMount() {
        this.refs.react_img["onload"] = this.onImageLoad.bind(this);
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (state.prevProps && state.prevProps.src != nextProps.src) {
            return { prevProps: nextProps, loaded: false };
        }
        return { prevProps: nextProps, loaded: true };
    }

    render() {
        const { className, ...props } = this.props;
        const rootClassName = classnames(className, "slide-animate", {
            "ng-hide-remove": true,
            "ng-hide-add": this.state.loaded
        });

        return <img ref="react_img" {...props} className={rootClassName} />;
    }
}

export default Image;
