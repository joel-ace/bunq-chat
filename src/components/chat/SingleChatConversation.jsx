import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from 'context';
import { setDisplayConversation, getChatMessages } from 'actions/chatActions';
import { isActiveConversation, getUser } from 'helpers/app';

import SidebarListItem from 'components/common/SidebarListItem';

const SingleChatConversation = ({
  conversation: {
    conversation,
    users,
  }
}) => {
  const [user, setUser] = useState(null);
  const { dispatch, state } = useContext(AppContext);
  const { chat: { displayConversation } } = state;
  const { conversationId, name, type } = conversation;

  const isActiveConvo = displayConversation && isActiveConversation(
    displayConversation.conversationId,
    conversationId
  );
  const isActiveClassName = isActiveConvo ? 'active' : '';
  const icon = Number(type) === 2
    ? <i className="fa fa-users" />
    : <i className="fa fa-user-circle" />;

  useEffect(() => {
    const fetchUser = async () => {
      const chatUser = await getUser(users[0].userid);
      setUser(chatUser);
    };
    fetchUser();
    return () => {
      setUser(null);
    };
  }, []);

  const handleClick = () => {
    if (isActiveConvo) {
      return false;
    }

    setDisplayConversation(dispatch, conversation);
    getChatMessages(dispatch, conversationId);
  };

  return (
    <SidebarListItem
      className={isActiveClassName}
      onClick={handleClick}
      leftElement={icon}
      name={name || (user && user.name)}
    />
  );
};

SingleChatConversation.propTypes = {
  conversation: PropTypes.shape({
    conversation: PropTypes.object,
    users: PropTypes.array,
  }).isRequired,
};


export default SingleChatConversation;
