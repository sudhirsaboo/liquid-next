import * as React from "react";

export default function(InnerComponent, scrollerWindowClassName?, onScroll?) {
    class InfiniteScrollComponent extends React.Component<any, any> {
        constructor(props) {
            super(props);
        }

        getScrollerWindow = () => {
            if (scrollerWindowClassName) {
                const win: any = document.getElementsByClassName(
                    scrollerWindowClassName
                );
                if (win && win.children) return win.children[0];
                if (win.length) return win[0];
            } else {
                const win = document.getElementsByClassName("page-content");
                if (win) return win[0];
            }
            if (this.props.scrollerWindow) {
                return this.props.scrollerWindow.children[0];
            }

            return window;
        };

        reachedEnd = () => {
            const scrollerWindow = this.getScrollerWindow();

            if (scrollerWindow.innerHeight) {
                if (
                    scrollerWindow.innerHeight + scrollerWindow.scrollY >=
                    document.body.offsetHeight - 200
                ) {
                    return true;
                }
            } else if (
                scrollerWindow.scrollHeight -
                    scrollerWindow.scrollTop -
                    scrollerWindow.clientHeight <
                200
            ) {
                return true;
            }

            return false;
        };
        componentDidMount() {
            const win = this.getScrollerWindow();
            if (win) win.addEventListener("scroll", this.onScroll, false);
        }

        componentWillUnmount() {
            const win = this.getScrollerWindow();
            if (win) win.removeEventListener("scroll", this.onScroll, false);
        }

        onScroll = () => {
            const { playlist, filter } = this.props;

            let scroller = this.props.scrollFunc;

            if (this.props.store) {
                scroller = this.props.store.next.bind(
                    this.props.store,
                    playlist,
                    filter
                );
            }

            if (scroller && this.reachedEnd()) {
                this.props.dispatch(scroller());
            }
            if (onScroll && this.reachedEnd()) {
                this.props.dispatch(InnerComponent.onScroll());
            }
        };

        render() {
            return <InnerComponent {...this.props} />;
        }
    }

    return InfiniteScrollComponent;
}
