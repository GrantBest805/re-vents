import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsChat from "./EventDetailsChat";
import EventDetailsSidebar from "./EventDetailsSidebar";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../app/common/util/helpers";
import { goingToEvent, cancelGoingToEvent } from "../user/userActions";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};
  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(event => event.id === eventId)[0] ||
      {};
  }
  return {
    event,
    auth: state.firebase.auth
  };
};
const actions = {
  goingToEvent,
  cancelGoingToEvent
};

class EventDetailsPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;
    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailsHeader
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
            isGoing={isGoing}
            isHost={isHost}
            event={event}
          />
          <EventDetailsInfo event={event} />
          <EventDetailsChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailsSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}
export default withFirestore(
  connect(
    mapState,
    actions
  )(EventDetailsPage)
);
