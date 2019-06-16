import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../event/EventList';
import { createEvent, deleteEvent, updateEvent } from './eventActions';
import LoadingComponent from '../../app/layout/LoadingComponent';

const mapState = state => ({
	events: state.events,
	loading: state.async.loading,
});

const actions = {
	createEvent,
	deleteEvent,
	updateEvent,
};

class EventDashboard extends Component {
	handleDeleteEvent = eventId => () => {
		this.props.deleteEvent(eventId);
	};

	render() {
		const { events, loading } = this.props;
		if (loading) return <LoadingComponent />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList deleteEvent={this.handleDeleteEvent} events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<h2>Activity Feed</h2>
				</Grid.Column>
			</Grid>
		);
	}
}

export default connect(
	mapState,
	actions
)(EventDashboard);
