import styled from "styled-components";
import "./App.css";
import { Toolbox } from "./components/Toolbox";
import { Grid } from "./components/Grid";
import { useFieldsStore } from "./store/store";
import { DUMMY_ROOT_ID } from "./definitions/BaseTree";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  height: 100%;
  background-color: red;
`;

const Right = styled.div`
  width: 300px;
  height: 100%;
  background-color: blue;
`;

function App() {
  const fields = useFieldsStore((state) => state.fields);
  return (
    <Container>
      <Left>
        <Grid data={fields} parentId={DUMMY_ROOT_ID} />
      </Left>
      <Right>
        <Toolbox />
      </Right>
    </Container>
  );
}

export default App;
