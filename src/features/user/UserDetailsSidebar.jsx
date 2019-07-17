import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailsSidebar = ({ isCurrentUser }) => {
  return (
    <Segment>
      {isCurrentUser ? (
        <Button
          as={Link}
          to='/settings'
          color='teal'
          fluid
          basic
          content='Edit Profile'
        />
      ) : (
        <Button color='teal' fluid basic content='Follow User' />
      )}
    </Segment>
  );
};

export default UserDetailsSidebar;
