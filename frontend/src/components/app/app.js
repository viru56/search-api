import {Search} from '../';
import { Container} from '@material-ui/core';
import "./app.scss";
function App() {
  return (
    <Container maxWidth="xl" className="main">
      <Search/>
    </Container>
  );
}

export default App;
