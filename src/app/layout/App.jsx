import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../features/nav/NavBar";
import EventDashboard from "../../features/event/EventDashboard";
import EventDetailsPage from "../../features/event/EventDetailsPage";
import UsersDashboard from "../../features/user/UsersDashboard";
import EventForm from "../../features/event/EventForm";
import SettingsDashboard from "../../features/settings/SettingsDashboard";
import UserDetails from "../../features/user/UserDetails";
import HomePage from "../../features/pages/HomePage";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>

        <Route
          path='/(.+)'
          render={() => (
            <div>
              <NavBar />
              <Container className='main'>
                <Switch>
                  <Route path='/events' component={EventDashboard} />
                  <Route path='/event/:id' component={EventDetailsPage} />
                  <Route path='/users' component={UsersDashboard} />
                  <Route path='/profile/:id' component={UserDetails} />
                  <Route path='/settings' component={SettingsDashboard} />
                  <Route path='/createEvent' component={EventForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}
export default App;
