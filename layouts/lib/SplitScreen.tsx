import styled from "styled-components";

const Screen = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const HeaderPane = styled.div`
  healder: 0;
`;

const Content = styled.div`
  display: flex;
  overflow: auto;
`;

const LeftPane = styled.div<{ leftwidth: string }>`
  overflow: auto;
  flex: 0 0 ${(props) => props.leftwidth}px;
`;

const RightPane = styled.div<{ rightwidth: string }>`
  overflow: auto;
  flex: 0 0 ${(props) => props.rightwidth}px;
`;

const SplitScreen = (props: any) => {
  const { leftwidth, rightwidth } = props;
  return (
    <Screen>
      <HeaderPane>{props.Header}</HeaderPane>
      <Content>
        <LeftPane leftwidth={leftwidth}>{props.Left}</LeftPane>
        <RightPane rightwidth={rightwidth}>{props.Right}</RightPane>
      </Content>
    </Screen>
  );
};

export default SplitScreen;
