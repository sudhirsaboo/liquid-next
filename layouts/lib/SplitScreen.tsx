import styled from "styled-components";

const Screen = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const HeaderPane = styled.div``;

const Content = styled.div`
  display: flex;
  overflow: auto;
`;

const LeftPane = styled.div<{ leftWidth: string }>`
  overflow: auto;
  flex: 0 0 ${(props) => props.leftWidth}px;
`;

const RightPane = styled.div<{ rightWidth: string }>`
  overflow: auto;
  flex: 0 0 ${(props) => props.rightWidth}px;
`;

export const SplitScreen = (props: any) => {
  const { Header, Left, Right, leftWidth, rightWidth } = props;
  return (
    <Screen>
      <HeaderPane>
        <Header />
      </HeaderPane>
      <Content>
        <LeftPane leftWidth={leftWidth}>
          <Left />
        </LeftPane>
        <RightPane rightWidth={rightWidth}>
          <Right />
        </RightPane>
      </Content>
    </Screen>
  );
};
