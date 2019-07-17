import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, Image, Item, Button, Header } from "semantic-ui-react";
import { format } from "date-fns";

const eventImageStyle = {
  filter: "brightness(30%)"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EventDetailsHeader = ({
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent,
}) => {

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.title}
                  style={{ color: "white" }}
                />
                {event.date && (
                  <p>{format(event.date.toDate(), "EEEE do LLLL")}</p>
                )}
                <p>
                  Hosted by <strong><Link style={{ color: 'pink'}} to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {!isHost && (
          <Fragment>
            {isGoing ? (
              <Button onClick={() => cancelGoingToEvent(event)}>
                LEAVE CREW
              </Button>
            ) : (
              <Button onClick={() => goingToEvent(event)} color='teal'>
                JOIN CREW
              </Button>
            )}
          </Fragment>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color='orange'
            floated='right'
          >
            Manage Job
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailsHeader;
