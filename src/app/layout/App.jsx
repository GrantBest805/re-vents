import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NavBar from '../../features/nav/NavBar';
import EventDashboard from '../../features/event/EventDashboard';
import EventDetailsPage from '../../features/event/EventDetailsPage';
import UsersDashboard from '../../features/user/UsersDashboard';
import EventForm from '../../features/event/EventForm';
import SettingsDashboard from '../../features/settings/SettingsDashboard';
import UserDetails from '../../features/user/UserDetails';
import HomePage from '../../features/pages/HomePage';
import TestComponent from '../../features/testarea/TestComponent';
import ModalManager from '../../features/modals/ModalManager';

class App extends Component {
	render() {
		return (
			<Fragment>
				<ModalManager />
				<Route exact path='/' component={HomePage} />
				<Route
					path='/(.+)'
					render={() => (
						<Fragment>
							<NavBar />
							<Container className='main'>
								<Switch key={this.props.location.key}>
									<Route exact path='/events' component={EventDashboard} />
									<Route path='/test' component={TestComponent} />
									<Route path='/events/:id' component={EventDetailsPage} />
									<Route path='/users' component={UsersDashboard} />
									<Route path='/profile/:id' component={UserDetails} />
									<Route path='/settings' component={SettingsDashboard} />
									<Route path={['/createEventForm', '/manage/:id']} component={EventForm} />
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}
export default withRouter(App);
