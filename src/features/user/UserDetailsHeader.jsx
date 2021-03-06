import React from "react";
import { Segment, Item, Header } from "semantic-ui-react";
import differenceInYears from "date-fns/differenceInCalendarYears";
import Lazyload from "react-lazyload";

const UserDetailsHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "unknown age";
  }

  return (
    <Segment>
      <Item.Group>
        <Item>
          <Lazyload
            height={150}
            placeholder={<Item.Image src='/assets/user.png' />}
          >
            <Item.Image
              avatar
              size='small'
              src={profile.photoURL || "/assets/user.png"}
            />
          </Lazyload>

          <Item.Content verticalAlign='bottom'>
            <Header as='h1'>{profile.displayName}</Header>
            <br />
            <Header as='h3'>{profile.occupation}</Header>
            <br />
            <Header as='h3'>
              {age}, Lives in {profile.city || "unknown city"}
            </Header>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default UserDetailsHeader;
