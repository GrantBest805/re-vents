import React from 'react';
import { Segment, Image, Header } from 'semantic-ui-react';

const UserDetailsPhotos = ({photos}) => {
	return (
		<Segment attached>
			<Header icon='image' content='Photos' />

			<Image.Group size='small'>
      {photos && photos.map(photo => (
        <Image key={photo.id} src={photo.url} />
      ))}
				
				
			</Image.Group>
		</Segment>
	);
};

export default UserDetailsPhotos;
