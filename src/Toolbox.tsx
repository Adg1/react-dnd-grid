import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: cyan;
  color: black;
  margin: 10px;
`;

export const Toolbox = () => {
  return (
    <Container>
      {arr.map((item) => {
        return <Box key={item}>{item}</Box>;
      })}
    </Container>
  );
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
