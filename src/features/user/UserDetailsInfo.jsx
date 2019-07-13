import React from 'react';
import { Segment, Grid, Header, List, Item, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';

const UserDetailsInfo = ({ profile }) => {
  let occupation;
  let origin;
	if (profile.occupation) {
		occupation = profile.occupation;
	} else {
		occupation = 'unknown';
	}
	if (profile.origin) {
		origin = profile.origin;
	} else {
		origin = 'unknown';
  }
	return (
		<Segment>
			<Grid columns={2}>
				<Grid.Column width={10}>
					<Header icon='smile' content='About Display Name' />
					<p>
						I am a: <strong>{occupation}</strong>
					</p>
					<p>
						Originally from: <strong>{origin}</strong>
					</p>
					<p>
          Member Since: { profile.createdAt && <strong>{format(profile.createdAt.toDate(), 'LLL yyyy')}</strong> }
					</p>
					<p>About me: <strong>{profile.about}</strong></p>
				</Grid.Column>
				<Grid.Column width={6}>
					<Header icon='heart outline' content='Interests' />
					<List>
						{profile.interests && profile.interests.length === 0 ? (
							<Item >
								<Item.Content>Really nothing interest you?</Item.Content>
							</Item>
						) : (
							profile.interests && profile.interests.map((interest,index) => (
								<Item key={index}>
									<Icon name='heart' />
									<Item.Content>{interest}</Item.Content>
								</Item>
							))
						)}
					</List>
				</Grid.Column>
			</Grid>
		</Segment>
	);
};

export default UserDetailsInfo;
