import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailsSidebar = () => {
	return (
		<Segment>
			<Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile' />
		</Segment>
	);
};

export default UserDetailsSidebar;
