import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import AppContext from 'context';
import SingleChatUser from 'components/chat/SingleChatUser';
import SidebarListWrapper from 'components/common/SidebarListWrapper';

import { clearSelectedGroupUsers } from 'actions/chatActions';

const ChatUsers = ({ users }) => {
  const {
    dispatch,
    state: { auth: { user: loggedInUser } }
  } = useContext(AppContext);

  useEffect(() => clearSelectedGroupUsers(dispatch), []);

  return (
    <SidebarListWrapper>
      {
        users && users.map(
          (user) => user.id !== loggedInUser.id && <SingleChatUser key={`ch-users-${user.id}`} user={user} />
        )
      }
    </SidebarListWrapper>
  );
};

ChatUsers.propTypes = {
  users: PropTypes.instanceOf(Array).isRequired,
};

export default ChatUsers;
