import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import UserDetailsHeader from "./UserDetailsHeader";
import UserDetailsInfo from "./UserDetailsInfo";
import UserDetailsEvents from "./UserDetailsEvents";
import UserDetailsPhotos from "./UserDetailsPhotos";
import UserDetailsSidebar from "./UserDetailsSidebar";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { userDetailedQuery } from "./userQueries";
import LoadingComponent from "../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos, 
    requesting: state.firestore.status.requesting
  };
};

class UserDetails extends Component {
  render() {
    const { profile, photos, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />

    return (
      <Grid>
        <Grid.Column width={16}>
          <UserDetailsHeader profile={profile} />
        </Grid.Column>
        <Grid.Column width={12}>
          <UserDetailsInfo profile={profile} />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserDetailsSidebar isCurrentUser={isCurrentUser} />
        </Grid.Column>
        <Grid.Column width={12}>
          {photos && photos.length > 0 && <UserDetailsPhotos photos={photos} />}
        </Grid.Column>
        <Grid.Column width={12}>
          <UserDetailsEvents />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetails);
