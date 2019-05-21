import React, {Component} from 'react';
import { Container } from 'semantic-ui-react';
import EventButton from '../../features/event/EventDashboard';
import NavBar from '../../features/nav/NavBar';

class App extends Component {
  render() {
    return (
      <Container className="main">
        <NavBar />
        <EventButton />
      </Container>
    );
  }
}
export default App;
