import React from 'react';
import PropTypes from 'prop-types';

import SingleChatConversation from 'components/chat/SingleChatConversation';
import SidebarListWrapper from 'components/common/SidebarListWrapper';

const ChatConversations = ({ conversations }) => (
  <SidebarListWrapper>
    {
      conversations && conversations.slice(0, 30).map(
        (conversation) => <SingleChatConversation key={`convo-${conversation.conversation.id}`} conversation={conversation} />
      )
    }
  </SidebarListWrapper>
);

ChatConversations.propTypes = {
  conversations: PropTypes.instanceOf(Array),
};

ChatConversations.defaultProps = {
  conversations: [],
};

export default ChatConversations;
