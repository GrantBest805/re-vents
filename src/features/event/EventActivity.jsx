import React, { Fragment } from 'react';
import { Header, Segment } from 'semantic-ui-react';

const EventActivity = () => {
	return (
		<Fragment>
			<Header attached='top' constent='Recent Activity' />
			<Segment attached>
				<p>Recent Activity</p>
			</Segment>
		</Fragment>
	);
};

export default EventActivity;
