import React, { Component } from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import EventAttendees from "./EventAttendees";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { objectToArray } from "../../app/common/util/helpers";

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/events/${event.id}`}>
                  {event.title}
                </Item.Header>
                <br/>
                <Item.Description>
                  Hosted by: <Link to={`/profile/${event.hostUid}`}><strong style={{ color: 'green'}}>{event.hostedBy}</strong></Link>
                </Item.Description>
                {event.cancelled && (
                  <Label
                    style={{ top: "-30px" }}
                    ribbon='right'
                    color='red'
                    content='This event has been canceled'
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' />
            {format(event.date.toDate(), "EEEE do LLL")} at{" "}
            {format(event.date.toDate(), "h:mm a")} |
            <Icon name='marker' /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              objectToArray(event.attendees).map((attendee) => (
                <EventAttendees key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          {/* <Button
            onClick={deleteEvent(event.id)}
            as='a'
            color='red'
            floated='right'
            content='Delete'
          /> */}
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
