import React from "react";
import ReactDOM from "react-dom";

class MobileInfiniteScroll extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        // eslint-disable-next-line
        const el = ReactDOM.findDOMNode(this.refs.scroll);
        el.addEventListener("scroll", this.onScroll, false);
    }

    componentWillUnmount() {
        // eslint-disable-next-line
        const el = ReactDOM.findDOMNode(this.refs.scroll);
        el.removeEventListener("scroll", this.onScroll, false);
    }

    onScroll() {
        // eslint-disable-next-line
        const el: any = ReactDOM.findDOMNode(this.refs.scroll);
        if (el.scrollTop >= el.scrollHeight - el.offsetHeight - 200) {
            this.props.dispatch(this.props.scrollFunc());
        }
    }

    render() {
        return (
            <div className={this.props.className} ref="scroll">
                {this.props.children}
            </div>
        );
    }
}

export default MobileInfiniteScroll;
