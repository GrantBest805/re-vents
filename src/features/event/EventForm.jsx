/*global google*/
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import cuid from 'cuid';
import { connect } from 'react-redux';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from './eventActions';
import TextInput from '../../app/common/form/TextInput';
import TextArea from '../../app/common/form/TextArea';
import SelectInput from '../../app/common/form/SelectInput';
import DateInput from '../../app/common/form/DateInput';
import PlaceInput from '../../app/common/form/PlaceInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const mapState = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {};

	if (eventId && state.events.length > 0) {
		event = state.events.filter(event => event.id === eventId)[0];
	}
	return {
		initialValues: event,
	};
};

const action = {
	createEvent,
	updateEvent,
};

const validate = combineValidators({
	title: isRequired({ message: 'The job Title is required' }),
	category: isRequired({ message: 'The category is required' }),
	description: composeValidators(
		isRequired({ message: 'Please enter description' }),
		hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
	)(),
	city: isRequired('city'),
	venue: isRequired('venue'),
	date: isRequired('date'),
});

const category = [
	{ key: 'drinks', text: 'Drinks', value: 'drinks' },
	{ key: 'culture', text: 'Culture', value: 'culture' },
	{ key: 'film', text: 'Film', value: 'film' },
	{ key: 'food', text: 'Food', value: 'food' },
	{ key: 'music', text: 'Music', value: 'music' },
	{ key: 'travel', text: 'Travel', value: 'travel' },
];

class EventForm extends Component {
	state = {
		cityLatLng: {},
		venueLatLng: {},
	};

	onFormSubmit = values => {
		values.venueLatLng = this.state.venueLatLng;
		if (this.props.initialValues.id) {
			this.props.updateEvent(values);
			this.props.history.push(`/events/${this.props.initialValues.id}`);
		} else {
			const newEvent = {
				...values,
				id: cuid(),
				hostPhotoURL: '/assets/user.png',
				hostedBy: 'Bob',
			};
			this.props.createEvent(newEvent);
			this.props.history.push(`/events/${newEvent.id}`);
		}
	};

	handleCitySelect = selectedCity => {
		geocodeByAddress(selectedCity)
			.then(results => getLatLng(results[0]))
			.then(latlng => {
				this.setState({
					cityLatLng: latlng,
				});
			})
			.then(() => {
				this.props.change('city', selectedCity);
			});
	};

	handleVenueSelect = selectedVenue => {
		geocodeByAddress(selectedVenue)
			.then(results => getLatLng(results[0]))
			.then(latlng => {
				this.setState({
					venueLatLng: latlng,
				});
			})
			.then(() => {
				this.props.change('venue', selectedVenue);
			});
	};

	render() {
		const { history, initialValues, invalid, submitting, pristine } = this.props;
		return (
			<Grid>
				<Grid.Column width={16}>
					<Segment>
						<Header sub color='teal' content='Job Details' />
						<Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete='off'>
							<Field name='title' component={TextInput} placeholder='Job Name' />
							<Field
								name='category'
								component={SelectInput}
								options={category}
								placeholder='Job Category'
							/>
							<Field name='number' component={TextInput} placeholder='Job Number' />
							<Field name='description' component={TextArea} rows={3} placeholder='job decription' />

							<Header sub color='teal' content='Job Location Details' />
							<Field
								name='city'
								component={PlaceInput}
								options={{ types: ['(cities)'] }}
								onSelect={this.handleCitySelect}
								placeholder='City'
							/>
							<Field name='venue' component={PlaceInput} options={{
								 location: new google.maps.LatLng(this.state.cityLatLng), 
								 radius: 1000, 
								 types: ['establishment']
								 }} 
								 onSelect={this.handleVenueSelect}
								 placeholder='Venue' 
							 />
							<Field
								name='date'
								component={DateInput}
								dateFormat='dd LLL yyyy h:mm a'
								showTimeSelect
								timeFormat='HH.mm'
								placeholder='Start Date'
							/>

							<Button disabled={invalid || submitting || pristine} positive type='submit'>
								Submit
							</Button>
							<Button
								onClick={
									initialValues.id
										? () => history.push(`/events/${initialValues.id}`)
										: () => history.push('events')
								}
								type='button'
							>
								Cancel
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

export default connect(
	mapState,
	action
)(reduxForm({ form: 'eventForm', validate })(EventForm));
