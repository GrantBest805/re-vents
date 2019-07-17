import React from "react";
import { Segment, Image, Header } from "semantic-ui-react";
import Lazyload from "react-lazyload";

const UserDetailsPhotos = ({ photos }) => {
  return (
    <Segment attached>
      <Header icon='image' content='Photos' />

      <Image.Group size='small'>
        {photos &&
          photos.map(photo => (
            <Lazyload
              key={photo.id}
							height={150}
              placeholder={<Image src='/assets/user.png' />}
            >
              <Image src={photo.url} />
            </Lazyload>
          ))}
      </Image.Group>
    </Segment>
  );
};

export default UserDetailsPhotos;
