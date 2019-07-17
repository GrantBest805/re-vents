import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../event/EventList';
import { createEvent, updateEvent } from './eventActions';
import LoadingComponent from '../../app/layout/LoadingComponent';
import EventActivity from './EventActivity';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapState = state => ({
	events: state.firestore.ordered.events,
});

const actions = {
	createEvent,
	updateEvent
};


class EventDashboard extends Component {
	
	handleDeleteEvent = eventId => () => {
		this.props.deleteEvent(eventId);
	};

	render() {
		const { events } = this.props;
		if (!isLoaded(events)) return <LoadingComponent />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList deleteEvent={this.handleDeleteEvent} events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

export default connect(
	mapState,
	actions
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
