import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import AppContext from 'context';
import {
  selectGroupChatUsers,
  unSelectGroupChatUser,
  createPersonalChat
} from 'actions/chatActions';
import { SIDEBAR_DISPLAY_OPTIONS } from 'src/constants';

import SidebarListItem from 'components/common/SidebarListItem';

const SingleChatUser = ({ user }) => {
  const { dispatch, state } = useContext(AppContext);
  const {
    displaySidebarComponent,
    groupChatSelectedUsers,
    auth: { user: loggedInUser }
  } = state;

  const handleCreatePersonalConversation = (users) => {
    createPersonalChat(dispatch, users);
  };

  const handleGroupUserSelect = () => {
    if (!groupChatSelectedUsers[loggedInUser.id]) {
      selectGroupChatUsers(dispatch, loggedInUser.id);
    }
    if (!groupChatSelectedUsers[user.id]) {
      return selectGroupChatUsers(dispatch, user.id);
    }
    return unSelectGroupChatUser(dispatch, user.id);
  };

  const handleClick = () => {
    if (displaySidebarComponent === SIDEBAR_DISPLAY_OPTIONS.groupChat) {
      handleGroupUserSelect();
    }

    if (displaySidebarComponent === SIDEBAR_DISPLAY_OPTIONS.personalChat) {
      const userIds = `${loggedInUser.id},${user.id}`;
      handleCreatePersonalConversation(userIds);
    }
  };

  return (
    <SidebarListItem
      onClick={handleClick}
      className={groupChatSelectedUsers && groupChatSelectedUsers[user.id] ? 'selected' : ''}
      leftElement={<i className="fa fa-user-circle" />}
      name={user.name}
    />
  );
};

SingleChatUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string.isRequired
  }).isRequired,
};

export default SingleChatUser;
