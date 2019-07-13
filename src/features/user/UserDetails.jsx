import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsInfo from './UserDetailsInfo';

const mapState = state => ({
	auth: state.firebase.aut,
	profile: state.firebase.profile
});

class UserDetails extends Component {
	render() {
		const { profile } = this.props;
		return (
			<Grid>
				<Grid.Column width={16}>
					<UserDetailsHeader profile={profile} />
				</Grid.Column>
				<Grid.Column width={12}>
					<UserDetailsInfo profile={profile} />
				</Grid.Column>
				<Grid.Column width={4}>
					<Segment>
						<Button color='teal' fluid basic content='Edit Profile' />
					</Segment>
				</Grid.Column>

				<Grid.Column width={12}>
					<Segment attached>
						<Header icon='image' content='Photos' />

						<Image.Group size='small'>
							<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
							<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
							<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
							<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
						</Image.Group>
					</Segment>
				</Grid.Column>

				<Grid.Column width={12}>
					<Segment attached>
						<Header icon='calendar' content='Events' />
						<Menu secondary pointing>
							<Menu.Item name='All Events' active />
							<Menu.Item name='Past Events' />
							<Menu.Item name='Future Events' />
							<Menu.Item name='Events Hosted' />
						</Menu>

						<Card.Group itemsPerRow={5}>
							<Card>
								<Image src={'/assets/categoryImages/drinks.jpg'} />
								<Card.Content>
									<Card.Header textAlign='center'>Event Title</Card.Header>
									<Card.Meta textAlign='center'>28th March 2018 at 10:00 PM</Card.Meta>
								</Card.Content>
							</Card>

							<Card>
								<Image src={'/assets/categoryImages/drinks.jpg'} />
								<Card.Content>
									<Card.Header textAlign='center'>Event Title</Card.Header>
									<Card.Meta textAlign='center'>28th March 2018 at 10:00 PM</Card.Meta>
								</Card.Content>
							</Card>
						</Card.Group>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

export default connect(mapState)(UserDetails);
