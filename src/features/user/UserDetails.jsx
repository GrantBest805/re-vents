import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsInfo from './UserDetailsInfo';
import UserDetailsEvents from './UserDetailsEvents';
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsSidebar from './UserDetailsSidebar';

const mapState = state => ({
	profile: state.firebase.profile,
	auth: state.firebase.auth,
	photos: state.firestore.ordered.photos
});

class UserDetails extends Component {
	render() {
		const { profile, photos } = this.props;
		return (
			<Grid>
				<Grid.Column width={16}>
					<UserDetailsHeader profile={profile} />
				</Grid.Column>
				<Grid.Column width={12}>
					<UserDetailsInfo profile={profile} />
				</Grid.Column>
				<Grid.Column width={4}>
					<UserDetailsSidebar />
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

export default connect(mapState)(UserDetails);
