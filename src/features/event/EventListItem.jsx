import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventAttendees from './EventAttendees';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class EventListItem extends Component {
	render() {
		const { event, deleteEvent } = this.props;
		let hrefLink = '#';
		return (
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size='tiny' circular src={event.hostPhotoURL} />
							<Item.Content>
								<Item.Header as='a'>{event.title}</Item.Header>
								<Item.Description>
									Hosted by
									<a href={hrefLink}>{` ${event.hostedBy}`}</a>
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name='clock' />
						{format(event.date.toDate(), 'EEEE do LLL')} at{' '}
						{format(event.date.toDate(), 'h:mm a')} |
						<Icon name='marker' /> {event.venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{event.attendees &&
							Object.values(event.attendees).map((attendee, index) => (
								<EventAttendees key={index} attendee={attendee} />
							))}
					</List>
				</Segment>
				<Segment clearing>
					<span>{event.description}</span>
					<Button
						onClick={deleteEvent(event.id)}
						as='a'
						color='red'
						floated='right'
						content='Delete'
					/>
					<Button
						as={Link}
						to={`/events/${event.id}`}
						color='teal'
						floated='right'
						content='View'
					/>
				</Segment>
			</Segment.Group>
		);
	}
}
export default EventListItem;
