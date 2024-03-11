import "./SplitScreen.scss";
const LeftPane = (leftwidth: number) => {
  return {
    flex: `0 0 ${leftwidth}px`,
  };
};
const RightPane = (rightwidth: number) => {
  return {
    flex: `0 0 ${rightwidth}px`,
  };
};

const SplitScreen = (props: any) => {
  const { leftwidth, rightwidth } = props;
  return (
    <div className="screen">
      <div className="header-pane">{props.Header}</div>
      <div className="content">
        <div className="left-pane" style={LeftPane(leftwidth)}>
          {props.Left}
        </div>
        <div className="right-pane" style={RightPane(rightwidth)}>
          {props.Right}
        </div>
      </div>
    </div>
  );
};

export default SplitScreen;
